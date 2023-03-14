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

describe("array.random()", () => {
	it("Should return undefined when the array is empty", () => {
		assert.equal(array.random([]), undefined);
	});
	it("Should always return the only element when the array has only one", () => {
		assert.equal(array.random(["a"]), "a");
	});
	it("Can return the first element", () => {
		while (array.random(["a", "b", "c", "d", "e", "f"]) !== "a");
		assert.ok(true);
	});
	it("Can return the last element", () => {
		while (array.random(["a", "b", "c", "d", "e", "f"]) !== "f");
		assert.ok(true);
	});
	it("Can return an element in the middle", () => {
		while (array.random(["a", "b", "c", "d", "e", "f"]) !== "c");
		assert.ok(true);
	});
});

describe("array.shuffle()", () => {
	it("Should return shuffled array", () => {
		const shuffledArray = array.shuffle("abcdef".split(""));
		const isSameLength = shuffledArray.length === 6
		const hasAllElements = "abcdef".split("").every(char => shuffledArray.includes(char));
		const isShuffled = "abcdef".split("").some((char, index) => char !== shuffledArray[index]);
		assert.ok(isSameLength && hasAllElements && isShuffled);
	});
	it("Should return the same reference to the array", () => {
		const tmpArray = [];
		assert.equal(array.shuffle(tmpArray), tmpArray);
	});
});

describe("array.chunk()", () => {
	it("Should return empty array when the array is empty", () => {
		assert.deepStrictEqual(array.chunk([], 1), []);
	});
	it("Should return correct result when the array's length and the length are multiples", () => {
		assert.deepStrictEqual(array.chunk(["a", "b", "c", "d", "e", "f"], 2), [["a", "b"], ["c", "d"], ["e", "f"]]);
	});
	it("Should return correct result when the array's length and the length aren't multiple", () => {
		assert.deepStrictEqual(array.chunk(["a", "b", "c", "d", "e", "f"], 5), [["a", "b", "c", "d", "e"], ["f"]]);
	});
	it("Should return correct result when the length is 1", () => {
		assert.deepStrictEqual(array.chunk(["a", "b", "c", "d", "e", "f"], 1), [["a"], ["b"], ["c"], ["d"], ["e"], ["f"]]);
	});
	it("Should return an array with single item when the length equal to the array's length", () => {
		assert.deepStrictEqual(array.chunk(["a", "b", "c", "d", "e", "f"], 6), [["a", "b", "c", "d", "e", "f"]]);
	});
	it("Should return an array with single item when the length is greater than the array's length", () => {
		assert.deepStrictEqual(array.chunk(["a", "b", "c", "d", "e", "f"], 10), [["a", "b", "c", "d", "e", "f"]]);
	});
	it("Should throw an error when the length is less than 1", () => {
		assert.throws(() => array.chunk([], 0), {message: "Length value must be greater than 0. Specified value: 0"})
	});
});
