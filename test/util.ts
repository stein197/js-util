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
	const rect1 = {x: 0, y: 0, width: 10, height: 10};
	it("Should return true when rects intersect vertically", () => {
		const rect2 = {x: 2, y: 2, width: 6, height: 10}
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when rects intersect horizontally", () => {
		const rect2 = {x: 2, y: 2, width: 10, height: 6};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when rects only touch sides horizontally", () => {
		const rect2 = {x: 10, y: 0, width: 10, height: 10};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when rects only touch sides vertically", () => {
		const rect2 = {x: 0, y: 10, width: 10, height: 10};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when rects only touch corners", () => {
		const rect2 = {x: 10, y: 10, width: 10, height: 10};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when one rect is inside another", () => {
		const rect2 = {x: 2, y: 2, width: 6, height: 6};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
	it("Should return true when both rects are equal", () => {
		assert.equal(util.intersects(rect1, rect1), true);
	});
	it("Should return false when rects do not intersect horizontally", () => {
		const rect2 = {x: 20, y: 0, width: 10, height: 10};
		assert.equal(util.intersects(rect1, rect2), false);
		assert.equal(util.intersects(rect2, rect1), false);
	});
	it("Should return false when rects do not intersect vertically", () => {
		const rect2 = {x: 0, y: 20, width: 10, height: 10};
		assert.equal(util.intersects(rect1, rect2), false);
		assert.equal(util.intersects(rect2, rect1), false);
	});
	it("Should return true when one of the rects is zero-valued and it's inside another one", () => {
		const rect2 = {x: 5, y: 5, width: 0, height: 0};
		assert.equal(util.intersects(rect1, rect2), true);
		assert.equal(util.intersects(rect2, rect1), true);
	});
});

describe("util.random()", () => {
	it("Should always return expected number when bounds are the same", () => {
		assert.equal(util.random(5, 5), 5);
	});
	it("Can return number between specified bounds when bounds are positive", () => {
		while (util.random(2, 5) < 2 || 5 < util.random(2, 5));
		assert.ok(true);
	});
	it("Can return number between specified bounds when bounds are negative", () => {
		while (util.random(-5, -2) < -5 || -2 < util.random(-5, -2));
		assert.ok(true);
	});
	it("Can return number between specified bounds when min is negative and max is positive", () => {
		while (util.random(-5, 5) < -5 || 5 < util.random(-5, 5));
		assert.ok(true);
	});
	it("Can return lower bound when bounds are positive", () => {
		while (util.random(2, 5) !== 2);
		assert.ok(true);
	});
	it("Can return lower bound when bounds are negative", () => {
		while (util.random(-5, -2) !== -5);
		assert.ok(true);
	});
	it("Can return lower bound when min is negative and max is positive", () => {
		while (util.random(-5, 5) !== -5);
		assert.ok(true);
	});
	it("Can return upper bound when bounds are positive", () => {
		while (util.random(2, 5) !== 5);
		assert.ok(true);
	});
	it("Can return upper bound when bounds are negative", () => {
		while (util.random(-5, -2) !== -2);
		assert.ok(true);
	});
	it("Can return upper bound when min is negative and max is positive", () => {
		while (util.random(-5, 5) !== 5);
		assert.ok(true);
	});
	it("Should return correct result when specifying only upper bound", () => {
		while (util.random(5) < 0 || 5 < util.random(5));
		assert.ok(true);
	});
});
