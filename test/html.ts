import "mocha";
import * as assert from "assert";
import * as jsdom from "jsdom";
import * as html from "../src/html";
import * as util from "../src/util";

describe("html.getHighestZIndex()", () => {
	const window = new jsdom.JSDOM().window as unknown as Window;
	const getHighestZIndex = util.curry(html.getHighestZIndex, window);
	afterEach(() => window.document.body.innerHTML = "");
	it("Should return correct result", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10; position: relative\"></div><div style=\"z-index: 20; position: relative\"></div>";
		assert.equal(getHighestZIndex(window.document.body), 20);
	});
	it("Should return -1 when all children has static positioning (by default)", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10\"></div><div style=\"z-index: 20\"></div>";
		assert.equal(getHighestZIndex(window.document.body), -1);
	});
	it("Should return -1 when the element has no children", () => {
		assert.equal(getHighestZIndex(window.document.body), -1);
	});
	it("Should return correct result when the element has children with static positioning and the child has the highest z-index", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10\"></div><div><div style=\"position: relative; z-index: 20\"></div></div>";
		assert.equal(getHighestZIndex(window.document.body), 20);
	});
	it("Should return correct result when the element has children with static positioning and the child does not have the highest z-index", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10; position: relative\"></div><div><div style=\"z-index: 20\"></div></div>";
		assert.equal(getHighestZIndex(window.document.body), 10);
	});
});

describe("html.selector()", () => {
	const window = new jsdom.JSDOM().window as unknown as Window;
	it("Should return correct result", () => {
		window.document.body.innerHTML = "<main id=\"id-main\" class=\"class-main\"><div></div><div title=\"&quot;Quoted title&quot;\"></div></main>";
		const element = window.document.querySelector("[title]")!;
		assert.equal(html.selector(element), "html > body:nth-child(2) > main#id-main.class-main:nth-child(1) > div[title=\"\\\"Quoted title\\\"\"]:nth-child(2)");
	});
});

describe("html.getInputValue()", () => {
	const window = new jsdom.JSDOM().window as unknown as Window;
	const body = window.document.body;

	function setInnerHTML(data: string) {
		body.innerHTML = data;
	}

	function getInput(): HTMLInputElement {
		return body.querySelector("input")!;
	}

	function getSelect(): HTMLSelectElement {
		return body.querySelector("select")!;
	}

	function getButton(): HTMLButtonElement {
		return body.querySelector("button")!;
	}

	function getTextArea(): HTMLTextAreaElement {
		return body.querySelector("textarea")!;
	}

	describe("<input />", () => {
		describe("type=\"checkbox\"", () => {
			it("Should return true when checkbox is checked", () => {
				setInnerHTML("<input type=\"checkbox\" checked />");
				assert.equal(html.getInputValue(getInput()), true);
			});
			it("Should return false when checkbox is unchecked", () => {
				setInnerHTML("<input type=\"checkbox\" />");
				assert.equal(html.getInputValue(getInput()), false);
			});
			it("Should return undefined when checkbox's state is indeterminate", () => {
				setInnerHTML("<input type=\"checkbox\" />");
				getInput().indeterminate = true;
				assert.equal(html.getInputValue(getInput()), null);
			});
		});
		describe("type=\"radio\"", () => {
			it("Should return true when radio is checked", () => {
				setInnerHTML("<input type=\"radio\" checked />");
				assert.equal(html.getInputValue(getInput()), true);
			});
			it("Should return false when radio is unchecked", () => {
				setInnerHTML("<input type=\"checkbox\" />");
				assert.equal(html.getInputValue(getInput()), false);
			});	
		});
		describe("type=\"color\"", () => {
			it("Should return 0 by default", () => {
				setInnerHTML("<input type=\"color\" />");
				assert.equal(html.getInputValue(getInput()), 0);
			});
			it("Should return correct number", () => {
				setInnerHTML("<input type=\"color\" value=\"#FF00FF\" />");
				assert.equal(html.getInputValue(getInput()), 0xFF00FF);
			});
		});
		describe("type=\"date\"", () => {
			it("Should return null when input value is empty", () => {
				setInnerHTML("<input type=\"date\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
			it("Should return date object", () => {
				setInnerHTML("<input type=\"date\" value=\"2012-12-21\" />");
				assert.equal(html.getInputValue(getInput()).getTime(), new Date("2012-12-21").getTime());
			});
			it("Should return null when input value is invalid", () => {
				setInnerHTML("<input type=\"date\" value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
		});
		describe("type=\"datetime-local\"", () => {
			it("Should return null when input value is empty", () => {
				setInnerHTML("<input type=\"datetime-local\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
			it("Should return date object", () => {
				setInnerHTML("<input type=\"datetime-local\" value=\"2012-12-21T12:00\" />");
				assert.equal(html.getInputValue(getInput()).getTime(), new Date("2012-12-21T12:00").getTime());
			});
			it("Should return null when input value is invalid", () => {
				setInnerHTML("<input type=\"datetime-local\" value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
		});
		describe("type=\"month\"", () => {
			it("Should return null when input value is empty", () => {
				setInnerHTML("<input type=\"month\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
			it("Should return date object", () => {
				setInnerHTML("<input type=\"month\" value=\"2021-12\" />");
				assert.equal(html.getInputValue(getInput()).getTime(), new Date("2021-12").getTime());
			});
			it("Should return null when input value is invalid", () => {
				setInnerHTML("<input type=\"month\" value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), null);
			});
		});
		describe("type=\"file\"", () => {
			it.skip("Should return null when input value is empty and \"multiple\" is false", () => {});
			it.skip("Should return file object when input has value and \"multiple\" is false", () => {});
			it.skip("Should return array of files when input has value and \"multiple\" is true", () => {});
			it.skip("Should return empty array when input doesn't have value and \"multiple\" is true", () => {});
		});
		describe("type=\"image\"", () => {
			it.skip("Should return null when input value is empty", () => {});
			it.skip("Should return image object when input value isn't empty", () => {});
		});
		describe("type=\"number\"", () => {
			it("Should return NaN when value is empty", () => {
				setInnerHTML("<input type=\"number\" />");
				assert.equal(html.getInputValue(getInput()), NaN);
			});
			it("Should return NaN when value cannot be casted to a number", () => {
				setInnerHTML("<input type=\"number\" value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), NaN);
			});
			it("Should return number when input value is valid", () => {
				setInnerHTML("<input type=\"number\" value=\"10\" />");
				assert.equal(html.getInputValue(getInput()), 10);
			});
		});
		describe("type=\"range\"", () => {
			it("Should return a halfway number when value is not set", () => {
				setInnerHTML("<input type=\"range\" min=\"0\" max=\"10\" />");
				assert.equal(html.getInputValue(getInput()), 5);
			});
			it("Should return correct number when value is set", () => {
				setInnerHTML("<input type=\"range\" min=\"0\" max=\"10\" value=\"10\" />");
				assert.equal(html.getInputValue(getInput()), 10);
			});
		});
		describe("type=\"text\"", () => {
			it("Should return empty string when value is not set", () => {
				setInnerHTML("<input type=\"text\" />");
				assert.equal(html.getInputValue(getInput()), "");
			});
			it("Should return string", () => {
				setInnerHTML("<input type=\"text\" value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), "string");
			});
		});
		describe("type=\"\"", () => {
			it("Should return empty string when value is not set", () => {
				setInnerHTML("<input />");
				assert.equal(html.getInputValue(getInput()), "");
			});
			it("Should return string", () => {
				setInnerHTML("<input value=\"string\" />");
				assert.equal(html.getInputValue(getInput()), "string");
			});
		});
	});
	describe("<select />", () => {
		it("Should return first option when none is selected and \"multiple\" is false", () => {
			setInnerHTML("<select><option value=\"a\"></option><option value=\"b\"></option><option value=\"c\"></option></select>");
			assert.equal(html.getInputValue(getSelect()), "a");
		});
		it("Should return empty array when none is selected and \"multiple\" is true", () => {
			setInnerHTML("<select multiple><option value=\"a\"></option><option value=\"b\"></option><option value=\"c\"></option></select>");
			assert.deepStrictEqual(html.getInputValue(getSelect()), []);
		});
		it("Should return string when an item is selected and \"multiple\" is false", () => {
			setInnerHTML("<select><option value=\"a\" selected></option><option value=\"b\"></option><option value=\"c\"></option></select>");
			assert.equal(html.getInputValue(getSelect()), "a");
		});
		it("Should return an array of string when items are selected and \"multiple\" is true", () => {
			setInnerHTML("<select multiple><option value=\"a\" selected></option><option value=\"b\"></option><option value=\"c\" selected></option></select>");
			assert.deepStrictEqual(html.getInputValue(getSelect()), ["a", "c"]);
		});
	});
	describe("<button />", () => {
		it("Should return empty string when the value is not set", () => {
			setInnerHTML("<button></button>");
			assert.deepStrictEqual(html.getInputValue(getButton()), "");
		});
		it("Should return string", () => {
			setInnerHTML("<button value=\"string\"></button>");
			assert.deepStrictEqual(html.getInputValue(getButton()), "string");
		});
	});
	describe("<textarea />", () => {
		it("Should return empty string when the value is not set", () => {
			setInnerHTML("<textarea></textarea>");
			assert.deepStrictEqual(html.getInputValue(getTextArea()), "");
		});
		it("Should return string", () => {
			setInnerHTML("<textarea>string</textarea>");
			assert.deepStrictEqual(html.getInputValue(getTextArea()), "string");
		});
	});
});

// TODO
describe("html.getTableRow()", () => {
	it.skip("Should return empty array when table or table section is empty", () => {});
	it.skip("Should return correct result when <table /> is passed", () => {});
	it.skip("Should return correct result when <thead /> is passed", () => {});
	it.skip("Should return correct result when <tbody /> is passed", () => {});
	it.skip("Should return correct result when <tfoot /> is passed", () => {});
	it.skip("Should correctly cast numbers to number type", () => {});
	it.skip("Should correctly cast types when a table cell contains only single input", () => {});
	it.skip("Should return correct result when handler is overriden", () => {});
	it.skip("Should pass correct arguments to handler", () => {});
	it.skip("Should return first row when the index is 0", () => {});
	it.skip("Should return last row the index is last", () => {});
});

// TODO
describe("html.getTableCol()", () => {
	it.skip("Should return empty array when table or table section is empty", () => {});
	it.skip("Should return correct result when <table /> is passed", () => {});
	it.skip("Should return correct result when <thead /> is passed", () => {});
	it.skip("Should return correct result when <tbody /> is passed", () => {});
	it.skip("Should return correct result when <tfoot /> is passed", () => {});
	it.skip("Should correctly cast numbers to number type", () => {});
	it.skip("Should correctly cast types when a table cell contains only single input", () => {});
	it.skip("Should return correct result when handler is overriden", () => {});
	it.skip("Should pass correct arguments to handler", () => {});
	it.skip("Should return first column when the index is 0", () => {});
	it.skip("Should return last column when the index is last", () => {});
});

// TODO
describe("html.getTable()", () => {
	it.skip("Should return empty array when table or table section is empty", () => {});
	it.skip("Should return correct result when <table /> is passed", () => {});
	it.skip("Should return correct result when <thead /> is passed", () => {});
	it.skip("Should return correct result when <tbody /> is passed", () => {});
	it.skip("Should return correct result when <tfoot /> is passed", () => {});
	it.skip("Should correctly cast numbers to number type", () => {});
	it.skip("Should correctly cast types when a table cell contains only single input", () => {});
	it.skip("Should return correct result when handler is overriden", () => {});
	it.skip("Should pass correct arguments to handler", () => {});
});
