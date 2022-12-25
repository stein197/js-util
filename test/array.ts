import "mocha";
import * as assert from "assert";
import * as array from "../src/array";

describe("array.diff()", () => {
	it("Should return correct result", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["a", "c"]), ["b"]);
	});
	it("Should return empty array when both arrays are empty", () => {
		assert.deepStrictEqual(array.diff([], []), []);
	});
	it("Should return empty array when the subtrahend contains all elements from the first array", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["a", "b", "c", "d"]), []);
	});
	it("Should return the same array when the second array is empty", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], []), ["a", "b", "c"]);
	});
	it("Should return the same array when the second array does not contain any elements from the first one", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["d", "e", "f"]), ["a", "b", "c"]);
	});
	it("Should not subtract anything when elements are objects and \"deep\" is false", () => {
		assert.deepStrictEqual(array.diff([{a: 1}, {b: 2}, {c: 3}], [{c: 3}]), [{a: 1}, {b: 2}, {c: 3}]);
	});
	it("Should subtract elements when elements are objects and \"deep\" is true", () => {
		assert.deepStrictEqual(array.diff([{a: 1}, {b: 2}, {c: 3}], [{c: 3}], true), [{a: 1}, {b: 2}]);
	});
});

describe("array.uniq()", () => {
	it("Should return correct result", () => {
		assert.deepStrictEqual(array.uniq(["a", "b", "c", "b", "a"]), ["a", "b", "c"]);
	});
	it("Should return an empty array when the array is empty", () => {
		assert.deepStrictEqual(array.uniq([]), []);
	});
	it("Should not subtract anything when elements are objects and \"deep\" is false", () => {
		assert.deepStrictEqual(array.uniq([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]), [{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]);
	});
	it("Should subtract elements when elements are objects and \"deep\" is true", () => {
		assert.deepStrictEqual(array.uniq([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}], true), [{a: 1}, {b: 2}, {c: 3}]);
	});
});
