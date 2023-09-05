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

describe("array.unique()", () => {
	it("Should return correct result", () => {
		assert.deepStrictEqual(array.unique(["a", "b", "c", "b", "a"]), ["a", "b", "c"]);
	});
	it("Should return an empty array when the array is empty", () => {
		assert.deepStrictEqual(array.unique([]), []);
	});
	it("Should not subtract anything when elements are objects and \"deep\" is false", () => {
		assert.deepStrictEqual(array.unique([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]), [{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}]);
	});
	it("Should subtract elements when elements are objects and \"deep\" is true", () => {
		assert.deepStrictEqual(array.unique([{a: 1}, {b: 2}, {c: 3}, {b: 2}, {a: 1}], true), [{a: 1}, {b: 2}, {c: 3}]);
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

describe("array.isSparse()", () => {
	it("Should return false when the array is empty", () => {
		assert.equal(array.isSparse([]), false);
	});
	it("Should return false when the array is not sparse", () => {
		assert.equal(array.isSparse(["a", "b", "c"]), false);
	});
	it("Should return true when the array is sparse", () => {
		assert.equal(array.isSparse(["a", , "c"]), true);
	});
});

describe("array.first()", () => {
	it("Should return expected element when the array is not empty", () => {
		assert.equal(array.first(["a", "b", "c"]), "a");
	});
	it("Should return undefined when the array is empty", () => {
		assert.equal(array.first([]), undefined);
	});
});

describe("array.last()", () => {
	it("Should return expected element when the array is not empty", () => {
		assert.equal(array.last(["a", "b", "c"]), "c");
	});
	it("Should return undefined when the array is empty", () => {
		assert.equal(array.last([]), undefined);
	});
});

describe("array.get()", () => {
	it("Should return correct result", () => {
		assert.equal(array.get(["a", "b", "c"], 1), "b");
	});
	it("Should return the first element when the index is 0", () => {
		assert.equal(array.get(["a", "b", "c"], 0), "a");
	});
	it("Should return the last element when the index is array.length - 1", () => {
		assert.equal(array.get(["a", "b", "c"], 2), "c");
	});
	it("Should return the first element when the index is -array.length;", () => {
		assert.equal(array.get(["a", "b", "c"], -3), "a");
	});
	it("Should return the last element when the index is -1", () => {
		assert.equal(array.get(["a", "b", "c"], -1), "c");
	});
	it("Should return undefined when there is no an element denoted by the passed indexedDB", () => {
		assert.equal(array.get(["a", "b", "c"], 4), undefined);
	});
	it("Should always return undefined when the array is empty", () => {
		assert.equal(array.get([], 0), undefined);
	});
});

describe("array.set()", () => {
	it("Should correctly change an element", () => {
		const a = ["a", "b", "c"];
		array.set(a, 1, "B");
		assert.equal(a[1], "B");
	});
	it("Should correctly change the first element when the index is 0", () => {
		const a = ["a", "b", "c"];
		array.set(a, 0, "A");
		assert.equal(a[0], "A");
	});
	it("Should correctly change the last element when the index is array.length - 1", () => {
		const a = ["a", "b", "c"];
		array.set(a, a.length - 1, "C");
		assert.equal(a[a.length - 1], "C");
	});
	it("Should correctly change the first element when the index is -array.length", () => {
		const a = ["a", "b", "c"];
		array.set(a, -a.length, "A");
		assert.equal(a[0], "A");
	});
	it("Should correctly change the last element when the index is -1", () => {
		const a = ["a", "b", "c"];
		array.set(a, -1, "C");
		assert.equal(a[2], "C");
	});
	it("Should correctly set a new value when there is no an element with passed index", () => {
		const a = ["a", "b", "c"];
		array.set(a, 3, "d");
		assert.equal(a[3], "d");
	});
});

describe("array.shift()", () => {
	it("Should do nothing when the array is empty", () => {
		const a = [];
		array.shift(a, 0);
		array.shift(a, -10);
		array.shift(a, 15);
		assert.deepStrictEqual(a, []);
	});
	it("Should do nothing when the array has only one element", () => {
		const a = ["a"];
		array.shift(a, -10);
		assert.deepStrictEqual(a, ["a"]);
		array.shift(a, 5);
		assert.deepStrictEqual(a, ["a"]);
	});
	it("Should do nothing when the offset is 0", () => {
		const a = ["a", "b", "c", "d", "e", "f"];
		array.shift(a, 0);
		assert.deepStrictEqual(a, ["a", "b", "c", "d", "e", "f"]);
	});
	it("Should do nothing when the offset is equal to the array length", () => {
		const a = ["a", "b", "c", "d", "e", "f"];
		array.shift(a, 6);
		assert.deepStrictEqual(a, ["a", "b", "c", "d", "e", "f"]);
		array.shift(a, -6);
		assert.deepStrictEqual(a, ["a", "b", "c", "d", "e", "f"]);
	});
	it("Should do nothing when the offset is multiple of the array length", () => {
		const a = ["a", "b", "c", "d", "e", "f"];
		array.shift(a, 12);
		assert.deepStrictEqual(a, ["a", "b", "c", "d", "e", "f"]);
		array.shift(a, -12);
		assert.deepStrictEqual(a, ["a", "b", "c", "d", "e", "f"]);
	});
	it("Should correctly shift the array", () => {
		const a = ["a", "b", "c", "d", "e", "f"];
		array.shift(a, 2);
		assert.deepStrictEqual(a, ["e", "f", "a", "b", "c", "d"]);
		array.shift(a, -1);
		assert.deepStrictEqual(a, ["f", "a", "b", "c", "d", "e"]);
		array.shift(a, 7);
		assert.deepStrictEqual(a, ["e", "f", "a", "b", "c", "d"]);
		array.shift(a, -5);
		assert.deepStrictEqual(a, ["d", "e", "f", "a", "b", "c"]);
	});
});
