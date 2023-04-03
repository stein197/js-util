import "mocha";
import * as assert from "assert";
import * as object from "../src/object";

const complexArray = [1, [3, {e: 5, f: 6}]];
const complexArrayCopy = [1, [3, {e: 5, f: 6}]];
const diffComplexArray = [1, [3, [5]]];
const partComplexArray = [1, [3, {}]];
const complexObject = {a: 1, b: {c: [1, 2, 3]}};
const complexObjectCopy = {a: 1, b: {c: [1, 2, 3]}};
const diffComplexObject = {a: 1, b: {c: [1, 3]}};
const partComplexObject = {b: {c: []}};

describe("object.deepMerge()", () => {
	it("Should return empty object when both objects are empty", () => {
		assert.deepStrictEqual(object.deepMerge({}, {}), {});
	});
	it("Should return the first object when the latter one is empty", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2, c: 3}, {}), {a: 1, b: 2, c: 3});
	});
	it("Should return the second object when the first one is empty", () => {
		assert.deepStrictEqual(object.deepMerge({}, {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
	});
	it("Should replace values in the first object with the values of the second object", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2}, {b: "2", c: "3"}), {a: 1, b: "2", c: "3"});
	});
	it("Should correctly merge nested objects", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: {c: 2, d: {e: 5, f: 6}}}, {b: {d: {f: "6", g: 7}}}), {a: 1, b: {c: 2, d: {e: 5, f: "6", g: 7}}});
	});
	it("Should return an object when one is an object and another one is an array", () => {
		assert.deepStrictEqual(object.deepMerge({}, []), {});
	});
	it("Should keep the value of the first object when the second one does not have corresponding key", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2}, {a: "1"}), {a: "1", b: 2});
	});
	it("Should return the value of the second object when the first one does not have corresponding key", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1}, {a: "1", b: 2}), {a: "1", b: 2});
	});
	it("Should correctly merge arrays", () => {
		assert.deepStrictEqual(object.deepMerge(["a", "b", "c"], [, "a", "b", "c"]), ["a", "a", "b", "c"]);
	});
	it("Should correctly merge object and array", () => {
		assert.deepStrictEqual(object.deepMerge(["a", "b", "c"], {a: 1, b: 2, c: 3}), {0: "a", 1: "b", 2: "c", a: 1, b: 2, c: 3});
	});
	it("Should merge arrays by keys when \"arrays\" is \"merge\"", () => {
		assert.deepStrictEqual(object.deepMerge([{a: 1}], [{b: 2}], "merge"), [{a: 1, b: 2}]);
	});
	it("Should append elements of the second array when \"arrays\" is \"append\"", () => {
		assert.deepStrictEqual(object.deepMerge([{a: 1}], [{b: 2}], "append"), [{a: 1}, {b: 2}]);
	});
	it("Should filter out unique elements in array when \"arrays\" is \"uniqie\"", () => {
		assert.deepStrictEqual(object.deepMerge([{a: 1}, {b: 2}], [{b: 2}, {c: 3}], "unique"), [{a: 1}, {b: 2}, {c: 3}]);
	});
});

describe("object.deepSeal()", () => {
	it("Should recursively seal an object", () => {
		const o = stub();
		object.deepSeal(o);
		assert.equal(Object.isSealed(o), true);
		assert.equal(Object.isSealed(o.b), true);
		assert.equal(Object.isSealed(o.b.d), true);
	});
});

describe("object.deepFreeze()", () => {
	it("Should recursively freeze an object", () => {
		const o = stub();
		object.deepFreeze(o);
		assert.equal(Object.isFrozen(o), true);
		assert.equal(Object.isFrozen(o.b), true);
		assert.equal(Object.isFrozen(o.b.d), true);
	});
});

describe("object.deepPreventExtensions()", () => {
	it("Should recursively prevent extensions", () => {
		const o = stub();
		object.deepPreventExtensions(o);
		assert.equal(Object.isExtensible(o), false);
		assert.equal(Object.isExtensible(o.b), false);
		assert.equal(Object.isExtensible(o.b.d), false);
	});
});

describe("object.equal()", () => {

	describe("Nulls", () => {
		it("equal(null, null) == true", () => assert.equal(object.equal(null, null), true));
	});

	describe("Booleans", () => {
		it("Equal booleans == true", () => assert.equal(object.equal(true, true), true));
		it("Unequal booleans == false", () => assert.equal(object.equal(true, false), false));
	});

	describe("Numbers", () => {
		it("Equal numbers == true", () => assert.equal(object.equal(1, 1), true));
		it("Unequal numbers == false", () => assert.equal(object.equal(1, 2), false));
	});

	describe("Strings", () => {
		it("Equal strings == true", () => assert.equal(object.equal("a", "a"), true));
		it("Empty strings == true", () => assert.equal(object.equal("", ""), true));
		it("Unequal strings == false", () => assert.equal(object.equal("a", "b"), false));
		it("String with empty one == false", () => assert.equal(object.equal("a", ""), false));
	});

	describe("Arrays", () => {
		it("Empty arrays == true", () => assert.equal(object.equal([], []), true));
		it("Equal arrays == true", () => assert.equal(object.equal(["a"], ["a"]), true));
		it("Part with full array == -1", () => assert.equal(object.equal(["a"], ["a", "b"]), -1));
		it("Full with part array == 1", () => assert.equal(object.equal(["a", "b"], ["a"]), 1));
		it("Unequal arrays == false", () => assert.equal(object.equal(["a", "b"], ["b", "a"]), false));
		it("Equal complex arrays == true", () => assert.equal(object.equal(complexArray, complexArrayCopy), true));
		it("Unequal complex arrays == false", () => assert.equal(object.equal(complexArray, diffComplexArray), false));
		it("Part with full complex array == -1", () => assert.equal(object.equal(partComplexArray, complexArray), -1));
		it("Full with part complex array == 1", () => assert.equal(object.equal(complexArray, partComplexArray), 1));
	});

	describe("Objects", () => {
		it("Empty objects == true", () => assert.equal(object.equal({}, {}), true));
		it("Equal objects == true", () => assert.equal(object.equal({a: 1}, {a: 1}), true));
		it("Part with full object == -1", () => assert.equal(object.equal({a: 1}, {a: 1, b: 2}), -1));
		it("Full with part object == 1", () => assert.equal(object.equal({a: 1, b: 2}, {a: 1}), 1));
		it("Unequal objects == false", () => assert.equal(object.equal({a: 1}, {b: 2}), false));
		it("Equal complex objects == true", () => assert.equal(object.equal(complexObject, complexObjectCopy), true));
		it("Unequal complex objects == false", () => assert.equal(object.equal(complexObject, diffComplexObject), false));
		it("Part with full complex object == -1", () => assert.equal(object.equal(partComplexObject, complexObject), -1));
		it("Full with part complex object == 1", () => assert.equal(object.equal(complexObject, partComplexObject), 1));
	});

	describe("Dates", () => {
		it("Should return false when dates are unequal", () => assert.equal(object.equal(new Date(0), new Date(1)), false));
		it("Should return true when dates are equal", () => assert.equal(object.equal(new Date(100), new Date(100)), true));
	});

	describe("Bigints", () => {
		it("Should return false when bigints are unequal", () => assert.equal(object.equal(0n, 1n), false));
		it("Should return true when bigintsare equal", () => assert.equal(object.equal(1n, 1n), true));
	});

	describe("Regexes", () => {
		it("Should return false when regexes are unequal", () => assert.equal(object.equal(/a/, /b/), false));
		it("Should return true when regexes are equal", () => assert.equal(object.equal(/a/, /a/), true));
	});

	describe("Mixed types with the same values", () => {
		it("equal(1, \"1\") == false", () => assert.equal(object.equal(1, "1"), false));
		it("equal(\"\", null) == false", () => assert.equal(object.equal("", null), false));
		it("equal([1], [\"1\"]) == false", () => assert.equal(object.equal([1], ["1"]), false));
		it("equal([], null) == false", () => assert.equal(object.equal([], null), false));
		it("equal({}, null) == false", () => assert.equal(object.equal({}, null), false));
	});
});

describe("object.partlyEqual()", () => {
	describe("Arrays", () => {
		it("Empty arrays == true", () => assert.equal(object.partlyEqual([], []), true));
		it("Equal arrays == true", () => assert.equal(object.partlyEqual(["a"], ["a"]), true));
		it("Part with full array == false", () => assert.equal(object.partlyEqual(["a"], ["a", "b"]), false));
		it("Full with part array == true", () => assert.equal(object.partlyEqual(["a", "b"], ["a"]), true));
		it("Unequal arrays == false", () => assert.equal(object.partlyEqual(["a", "b"], ["b", "a"]), false));
		it("Equal complex arrays == true", () => assert.equal(object.partlyEqual(complexArray, complexArrayCopy), true));
		it("Unequal complex arrays == false", () => assert.equal(object.partlyEqual(complexArray, diffComplexArray), false));
		it("Part with full complex array == false", () => assert.equal(object.partlyEqual(partComplexArray, complexArray), false));
		it("Full with part complex array == true", () => assert.equal(object.partlyEqual(complexArray, partComplexArray), true));
	});

	describe("Objects", () => {
		it("Empty objects == true", () => assert.equal(object.partlyEqual({}, {}), true));
		it("Equal objects == true", () => assert.equal(object.partlyEqual({a: 1}, {a: 1}), true));
		it("Part with full object == false", () => assert.equal(object.partlyEqual({a: 1}, {a: 1, b: 2}), false));
		it("Full with part object == true", () => assert.equal(object.partlyEqual({a: 1, b: 2}, {a: 1}), true));
		it("Unequal objects == false", () => assert.equal(object.partlyEqual({a: 1}, {b: 2}), false));
		it("Equal complex objects == true", () => assert.equal(object.partlyEqual(complexObject, complexObjectCopy), true));
		it("Unequal complex objects == false", () => assert.equal(object.partlyEqual(complexObject, diffComplexObject), false));
		it("Part with full complex object == false", () => assert.equal(object.partlyEqual(partComplexObject, complexObject), false));
		it("Full with part complex object == true", () => assert.equal(object.partlyEqual(complexObject, partComplexObject), true));
	});
});

describe("object.strictlyEqual()", () => {
	describe("Arrays", () => {
		it("Empty arrays == true", () => assert.equal(object.strictlyEqual([], []), true));
		it("Equal arrays == true", () => assert.equal(object.strictlyEqual(["a"], ["a"]), true));
		it("Part with full array == false", () => assert.equal(object.strictlyEqual(["a"], ["a", "b"]), false));
		it("Full with part array == false", () => assert.equal(object.strictlyEqual(["a", "b"], ["a"]), false));
		it("Unequal arrays == false", () => assert.equal(object.strictlyEqual(["a"], ["b"]), false));
		it("Equal complex arrays == true", () => assert.equal(object.strictlyEqual(complexArray, complexArrayCopy), true));
		it("Unequal complex arrays == false", () => assert.equal(object.strictlyEqual(complexArray, diffComplexArray), false));
		it("Part with full complex array == false", () => assert.equal(object.strictlyEqual(partComplexArray, complexArray), false));
		it("Full with part complex array == false", () => assert.equal(object.strictlyEqual(complexArray, partComplexArray), false));
	});

	describe("Objects", () => {
		it("Empty objects == true", () => assert.equal(object.strictlyEqual({}, {}), true));
		it("Equal objects == true", () => assert.equal(object.strictlyEqual({a: 1}, {a: 1}), true));
		it("Part with full object == false", () => assert.equal(object.strictlyEqual({a: 1}, {a: 1, b: 2}), false));
		it("Full with part object == false", () => assert.equal(object.strictlyEqual({a: 1, b: 2}, {a: 1}), false));
		it("Unequal objects == false", () => assert.equal(object.strictlyEqual({a: 1}, {b: 2}), false));
		it("Equal complex objects == true", () => assert.equal(object.strictlyEqual(complexObject, complexObjectCopy), true));
		it("Unequal complex objects == false", () => assert.equal(object.strictlyEqual(complexObject, diffComplexObject), false));
		it("Part with full complex object == false", () => assert.equal(object.strictlyEqual(partComplexObject, complexObject), false));
		it("Full with part complex object == false", () => assert.equal(object.strictlyEqual(complexObject, partComplexObject), false));
	});
});

describe("object.clone()", () => {
	describe("Primitives", () => {
		it("clone(null) === null", () => assert.equal(object.clone(null), null));
		it("clone(true) === true", () => assert.equal(object.clone(true), true));
		it("clone(1) === 1", () => assert.equal(object.clone(1), 1));
		it("clone(\"a\") === \"a\"", () => assert.equal(object.clone("a"), "a"));
	});

	describe("Arrays", () => {
		it("Returns equal object", () => assert.deepStrictEqual(object.clone(complexArray), complexArrayCopy));
		it("Returns different reference", () => assert.equal(object.clone(complexArray) !== complexArray, true));
	});

	describe("Objects", () => {
		it("Returns equal object", () => assert.deepStrictEqual(object.clone(complexObject), complexObjectCopy));
		it("Returns different reference", () => assert.equal(object.clone(complexObject) !== complexObject, true));
	});
});

describe("object.plain()", () => {
	it("Should return true when the object was created with {} literal", () => {
		assert.equal(object.plain({}), true);
	});
	it("Should return true when the object was created with Object.create(null) call", () => {
		assert.equal(object.plain(Object.create(null)), true);
	});
	it("Should return false when the object is an instance of a derived class", () => {
		assert.equal(object.plain(new class {}), false);
	});
});

function stub() {
	return {
		a: 1,
		b: {
			c: null,
			d: [
				1, 2, 3
			]
		}
	};
}
