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

// TODO
describe("html.getInputValue()", () => {
	describe("<input />", () => {
		describe("type=\"checkbox\"", () => {
			it.skip("Should return true when checkbox is checked", () => {});
			it.skip("Should return false when checkbox is unchecked", () => {});
			it.skip("Should return undefined when checkbox's state is indeterminate", () => {});
		});
		describe("type=\"radio\"", () => {
			it.skip("Should return true when radio is checked", () => {});
			it.skip("Should return false when radio is unchecked", () => {});	
		});
		describe("type=\"color\"", () => {
			it.skip("Should return 0 by default", () => {});
			it.skip("Should return correct number", () => {});
		});
		describe("type=\"date\"", () => {
			it.skip("Should return undefined when input value is empty", () => {});
			it.skip("Should return date object", () => {});
			it.skip("Should return undefined when input value is invalid", () => {});
		});
		describe("type=\"datetime\"", () => {
			it.skip("Should return undefined when input value is empty", () => {});
			it.skip("Should return date object", () => {});
			it.skip("Should return undefined when input value is invalid", () => {});
		});
		describe("type=\"month\"", () => {
			it.skip("Should return undefined when input value is empty", () => {});
			it.skip("Should return date object", () => {});
			it.skip("Should return undefined when input value is invalid", () => {});
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
			it.skip("Should return NaN when value is empty", () => {});
			it.skip("Should return NaN when value cannot be casted to a number", () => {});
			it.skip("Should return number when input value is valid", () => {});
		});
		describe("type=\"range\"", () => {
			it.skip("Should return number", () => {});
		});
		describe("type=\"text\"", () => {
			it.skip("Should return string", () => {});
		});
		describe("type=\"\"", () => {
			it.skip("Should return string", () => {});
		});
	});
	describe("<select />", () => {
		it.skip("Should return null when none is selected and \"multiple\" is false", () => {});
		it.skip("Should return empty array when none is selected and \"multiple\" is true", () => {});
		it.skip("Should return string when an item is selected and \"multiple\" is false", () => {});
		it.skip("Should return an array of string when items are selected and \"multiple\" is true", () => {});
	});
	describe("<button />", () => {
		it.skip("Should return string", () => {});
	});
	describe("<textarea />", () => {
		it.skip("Should return string", () => {});
	});
});

// TODO
describe("html.getTableRow()", () => {
	it.skip("Should return empty array when table is empty", () => {});
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
	it.skip("Should return empty array when table is empty", () => {});
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
	it.skip("Should return empty array when table is empty", () => {});
	it.skip("Should return correct result when <table /> is passed", () => {});
	it.skip("Should return correct result when <thead /> is passed", () => {});
	it.skip("Should return correct result when <tbody /> is passed", () => {});
	it.skip("Should return correct result when <tfoot /> is passed", () => {});
	it.skip("Should correctly cast numbers to number type", () => {});
	it.skip("Should correctly cast types when a table cell contains only single input", () => {});
	it.skip("Should return correct result when handler is overriden", () => {});
	it.skip("Should pass correct arguments to handler", () => {});
});

// TODO
describe("html.encode()", () => {
	
});

// TODO
describe("html.decode()", () => {
	
});
