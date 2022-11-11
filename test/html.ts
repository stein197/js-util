import * as assert from "assert";
import * as jsdom from "jsdom";
import * as mocha from "mocha";
import * as html from "../src/html";

mocha.describe("getHighestZIndex()", () => {
	let window: Window;
	mocha.beforeEach(() => window = new jsdom.JSDOM().window as unknown as Window);
	mocha.it("Should return correct result", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10; position: relative\"></div><div style=\"z-index: 20; position: relative\"></div>";
		assert.equal(html.getHighestZIndex(window, window.document.body), 20);
	});
	mocha.it("Should return -1 when all children has static positioning (by default)", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10\"></div><div style=\"z-index: 20\"></div>";
		assert.equal(html.getHighestZIndex(window, window.document.body), -1);
	});
	mocha.it("Should return -1 when the element has no children", () => {
		assert.equal(html.getHighestZIndex(window, window.document.body), -1);
	});
	mocha.it("Should return correct result when the element has children with static positioning and the child has the highest z-index", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10\"></div><div><div style=\"position: relative; z-index: 20\"></div></div>";
		assert.equal(html.getHighestZIndex(window, window.document.body), 20);
	});
	mocha.it("Should return correct result when the element has children with static positioning and the child does not have the highest z-index", () => {
		window.document.body.innerHTML = "<div style=\"z-index: 10; position: relative\"></div><div><div style=\"z-index: 20\"></div></div>";
		assert.equal(html.getHighestZIndex(window, window.document.body), 10);
	});
});
