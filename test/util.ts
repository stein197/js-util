import * as assert from "assert";
import * as mocha from "mocha";
import * as util from "../src/util";

mocha.describe("curry()", () => {
	const testFunction = (a: boolean | undefined, b: number, c: string): string => `a: ${a}, b: ${b}, c: ${c}`;
	
	mocha.it("Should return a function with the same behavior when no arguments were passed", () => {
		const curried = util.curry(testFunction);
		assert.equal(curried(true, 12, "string"), "a: true, b: 12, c: string");
	});
	mocha.it("Should return a function that does not need any arguments when all arguments were passed", () => {
		const curried = util.curry(testFunction, true, 12, "string");
		assert.equal(curried(), "a: true, b: 12, c: string");
	});
	mocha.it("Should return a correct function", () => {
		const curried = util.curry(testFunction, undefined, 12);
		assert.equal(curried("string"), "a: undefined, b: 12, c: string");
	});
});

mocha.describe("isPrimitive()", () => {
	mocha.it("Should return false for undefined", () => {
		assert.equal(util.isPrimitive(undefined), false);
	});
	mocha.it("Should return false for null", () => {
		assert.equal(util.isPrimitive(null), false);
	});
	mocha.it("Should return true for boolean", () => {
		assert.equal(util.isPrimitive(true), true);
	});
	mocha.it("Should return true for number", () => {
		assert.equal(util.isPrimitive(12), true);
	});
	mocha.it("Should return true for bigint", () => {
		assert.equal(util.isPrimitive(12n), true);
	});
	mocha.it("Should return true for string", () => {
		assert.equal(util.isPrimitive("string"), true);
	});
	mocha.it("Should return false for array", () => {
		assert.equal(util.isPrimitive([]), false);
	});
	mocha.it("Should return false for object", () => {
		assert.equal(util.isPrimitive({}), false);
	});
	mocha.it("Should return false for function", () => {
		assert.equal(util.isPrimitive(() => {}), false);
	});
});
