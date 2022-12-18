import * as assert from "assert";
import * as mocha from "mocha";
import * as array from "../src/array";

mocha.describe("diff()", () => {
	mocha.it("Should return correct result", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["a", "c"]), ["b"]);
	});
	mocha.it("Should return empty array when both arrays are empty", () => {
		assert.deepStrictEqual(array.diff([], []), []);
	});
	mocha.it("Should return empty array when the subtrahend contains all elements from the first array", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["a", "b", "c", "d"]), []);
	});
	mocha.it("Should return the same array when the second array is empty", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], []), ["a", "b", "c"]);
	});
	mocha.it("Should return the same array when the second array does not contain any elements from the first one", () => {
		assert.deepStrictEqual(array.diff(["a", "b", "c"], ["d", "e", "f"]), ["a", "b", "c"]);
	});
	mocha.it("Should not subtract anything when elements are objects and \"deep\" is false", () => {
		assert.deepStrictEqual(array.diff([{a: 1}, {b: 2}, {c: 3}], [{c: 3}]), [{a: 1}, {b: 2}, {c: 3}]);
	});
	mocha.it("Should subtract elements when elements are objects and \"deep\" is true", () => {
		assert.deepStrictEqual(array.diff([{a: 1}, {b: 2}, {c: 3}], [{c: 3}], true), [{a: 1}, {b: 2}]);
	});
});

mocha.describe("uniq()", () => {
	mocha.it("Should return correct result", () => {
		assert.deepStrictEqual(array.uniq(["a", "b", "c", "b", "a"]), ["a", "b", "c"]);
	});
	mocha.it("Should return an empty array when the array is empty", () => {
		assert.deepStrictEqual(array.uniq([]), []);
	});
	mocha.it("Should not subtract anything when elements are objects and \"deep\" is false", () => {
		assert.deepStrictEqual(array.uniq([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]), [{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]);
	});
	mocha.it("Should subtract elements when elements are objects and \"deep\" is true", () => {
		assert.deepStrictEqual(array.uniq([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}], true), [{a: 1}, {b: 2}, {c: 3}]);
	});
});
