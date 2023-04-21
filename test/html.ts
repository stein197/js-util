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
		describe("type=\"checkbox\"", () => {});
		describe("type=\"radio\"", () => {});
		describe("type=\"color\"", () => {});
		describe("type=\"date\"", () => {});
		describe("type=\"datetime\"", () => {});
		describe("type=\"month\"", () => {});
		describe("type=\"file\"", () => {});
		describe("type=\"image\"", () => {});
		describe("type=\"number\"", () => {});
		describe("type=\"range\"", () => {});
		describe("type=\"text\"", () => {});
		describe("type=\"\"", () => {});
	});
	describe("<select />", () => {});
	describe("<button />", () => {});
	describe("<textarea />", () => {});
});

// TODO
describe("html.getTableRow()", () => {
	
});

// TODO
describe("html.getTableCol()", () => {
	
});

// TODO
describe("html.getTable()", () => {
	
});

// TODO
describe("html.encode()", () => {
	
});

// TODO
describe("html.decode()", () => {
	
});
