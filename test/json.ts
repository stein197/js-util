import "mocha";
import * as assert from "assert";
import * as json from "../src/json";

describe("isArray()", () => {
	it("Empty array == true", () => assert.equal(json.isArray([]), true));
	it("Empty object == false", () => assert.equal(json.isArray({}), false));
});

describe("isObject()", () => {
	it("Empty array == false", () => assert.equal(json.isObject([]), false));
	it("Empty object == true", () => assert.equal(json.isObject({}), true));
});

describe("isEmpty()", () => {
	it("null is empty", () => assert.equal(json.isEmpty(null), true));
	it("true is not empty", () => assert.equal(json.isEmpty(true), false));
	it("false is not empty", () => assert.equal(json.isEmpty(false), false));
	it("0 is not empty", () => assert.equal(json.isEmpty(0), false));
	it("number is not empty", () => assert.equal(json.isEmpty(1), false));
	it("Empty string == true", () => assert.equal(json.isEmpty(""), true));
	it("Empty array == true", () => assert.equal(json.isEmpty([]), true));
	it("Empty object == true", () => assert.equal(json.isEmpty({}), true));
	it("Not empty string == false", () => assert.equal(json.isEmpty(" "), false));
	it("Not empty array == false", () => assert.equal(json.isEmpty(["a"]), false));
	it("Not empty object == false", () => assert.equal(json.isEmpty({a: 1}), false));
});
