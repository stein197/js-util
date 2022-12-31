import "mocha";
import * as assert from "assert";
import * as util from "../src/util";

describe("util.curry()", () => {
	const testFunction = (a: boolean | undefined, b: number, c: string): string => `a: ${a}, b: ${b}, c: ${c}`;
	
	it("Should return a function with the same behavior when no arguments were passed", () => {
		const curried = util.curry(testFunction);
		assert.equal(curried(true, 12, "string"), "a: true, b: 12, c: string");
	});
	it("Should return a function that does not need any arguments when all arguments were passed", () => {
		const curried = util.curry(testFunction, true, 12, "string");
		assert.equal(curried(), "a: true, b: 12, c: string");
	});
	it("Should return a correct function", () => {
		const curried = util.curry(testFunction, undefined, 12);
		assert.equal(curried("string"), "a: undefined, b: 12, c: string");
	});
});

describe("util.isPrimitive()", () => {
	it("Should return false for undefined", () => {
		assert.equal(util.isPrimitive(undefined), false);
	});
	it("Should return false for null", () => {
		assert.equal(util.isPrimitive(null), false);
	});
	it("Should return true for boolean", () => {
		assert.equal(util.isPrimitive(true), true);
	});
	it("Should return true for number", () => {
		assert.equal(util.isPrimitive(12), true);
	});
	it("Should return true for bigint", () => {
		assert.equal(util.isPrimitive(12n), true);
	});
	it("Should return true for string", () => {
		assert.equal(util.isPrimitive("string"), true);
	});
	it("Should return false for array", () => {
		assert.equal(util.isPrimitive([]), false);
	});
	it("Should return false for object", () => {
		assert.equal(util.isPrimitive({}), false);
	});
	it("Should return false for function", () => {
		assert.equal(util.isPrimitive(() => {}), false);
	});
});

describe("util.intersects()", () => {
	it("Should return true when one rect intersect another by top side", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 2, y: -6, width: 6, height: 10}), true);
	});
	it("Should return true when one rect intersect another by right side", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 2, width: 10, height: 6}), true);
	});
	it("Should return true when one rect intersect another by bottom side", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 2, y: 5, width: 6, height: 10}), true);
	});
	it("Should return true when one rect intersect another by left side", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: -5, y: 2, width: 10, height: 6}), true);
	});
	it("Should return true when only borders touch each other by top side and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: -10, width: 10, height: 10}, true), true);
	});
	it("Should return true when only borders touch each other by right side and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 10, y: 0, width: 10, height: 10}, true), true);
	});
	it("Should return true when only borders touch each other by bottom side and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 10, width: 10, height: 10}, true), true);
	});
	it("Should return true when only borders touch each other by left side and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: -10, y: 0, width: 10, height: 10}, true), true);
	});
	it("Should return false when only borders touch each other by top side and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: -10, y: 0, width: 10, height: 10}, false), false);
	});
	it("Should return false when only borders touch each other by right side and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 10, y: 0, width: 10, height: 10}, false), false);
	});
	it("Should return false when only borders touch each other by bottom side and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 10, width: 10, height: 10}, false), false);
	});
	it("Should return false when only borders touch each other by left side and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: -10, width: 10, height: 10}, false), false);
	});
	it("Should return true when one rect is inside another", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 2, y: 2, width: 6, height: 6}), true);
		assert.equal(util.intersects({x: 2, y: 2, width: 6, height: 6}, {x: 0, y: 0, width: 10, height: 10}), true);
	});
	it("Should return true when only corners intersect and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 10, y: 10, width: 10, height: 10}, true), true);
	});
	it("Should return false when only corners intersect and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 10, y: 10, width: 10, height: 10}, false), false);
	});
	it("Should return true when both rect are equal and \"borders\" is true", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 10, height: 10}, true), true);
	});
	it("Should return true when both rect are equal and \"borders\" is false", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 0, width: 10, height: 10}, false), true);
	});
	it("Should return false when rects do not intersect each other and the second one is above the first one", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: -20, width: 10, height: 10}, true), true);
	});
	it("Should return false when rects do not intersect each other and the second one is on the right from the first one", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 20, y: 0, width: 10, height: 10}, true), true);
	});
	it("Should return false when rects do not intersect each other and the second one is below the first one", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 0, y: 20, width: 10, height: 10}, true), true);
	});
	it("Should return false when rects do not intersect each other and the second one is on the left from the first one", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: -20, y: 0, width: 10, height: 10}, true), true);
	});
	it("Should return true when one of the rects is zero-valued and it's inside another one", () => {
		assert.equal(util.intersects({x: 0, y: 0, width: 10, height: 10}, {x: 5, y: 5, width: 0, height: 0}), true);
	});
});
