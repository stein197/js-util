import "mocha";
import * as assert from "assert";
import * as json from "../src/json";

describe("json.isArray()", () => {
	it("Empty array == true", () => assert.equal(json.isArray([]), true));
	it("Empty object == false", () => assert.equal(json.isArray({}), false));
});

describe("json.isObject()", () => {
	it("Empty array == false", () => assert.equal(json.isObject([]), false));
	it("Empty object == true", () => assert.equal(json.isObject({}), true));
});

describe("json.isEmpty()", () => {
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

describe("json.valid()", () => {
	it("Should return true for null", () => assert.equal(json.valid(null), true));
	it("Should return true for boolean", () => assert.equal(json.valid(true), true));
	it("Should return true for number", () => assert.equal(json.valid(12), true));
	it("Should return true for string", () => assert.equal(json.valid("string"), true));
	it("Should return true for plain array", () => assert.equal(json.valid(["a", "b", "c"]), true));
	it("Should return true for plain object", () => assert.equal(json.valid({a: 1, b: 2, c: 3}), true));
	it("Should return true for complex true JSON", () => assert.equal(json.valid([{a: 1}, {b: 2}, {c: 3}]), true));
	it("Should return false when the argument is instance of another class", () => assert.equal(json.valid(new Map()), false));
	it("Should return false when the argument contains complex object values", () => assert.equal(json.valid([new Map()]), false));
});
