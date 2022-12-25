import * as assert from "assert";
import * as mocha from "mocha";
import * as object from "../src/object";

const complexArray = [1, [3, {e: 5, f: 6}]];
const complexArrayCopy = [1, [3, {e: 5, f: 6}]];
const diffComplexArray = [1, [3, [5]]];
const partComplexArray = [1, [3, {}]];
const complexObject = {a: 1, b: {c: [1, 2, 3]}};
const complexObjectCopy = {a: 1, b: {c: [1, 2, 3]}};
const diffComplexObject = {a: 1, b: {c: [1, 3]}};
const partComplexObject = {b: {c: []}};

mocha.describe("deepMerge()", () => {
	mocha.it("Should return empty object when both objects are empty", () => {
		assert.deepStrictEqual(object.deepMerge({}, {}), {});
	});
	mocha.it("Should return the first object when the latter one is empty", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2, c: 3}, {}), {a: 1, b: 2, c: 3});
	});
	mocha.it("Should return the second object when the first one is empty", () => {
		assert.deepStrictEqual(object.deepMerge({}, {a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
	});
	mocha.it("Should replace values in the first object with the values of the second object", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2}, {b: "2", c: "3"}), {a: 1, b: "2", c: "3"});
	});
	mocha.it("Should correctly merge nested objects", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: {c: 2, d: {e: 5, f: 6}}}, {b: {d: {f: "6", g: 7}}}), {a: 1, b: {c: 2, d: {e: 5, f: "6", g: 7}}});
	});
	mocha.it("Should return an object when one is an object and another one is an array", () => {
		assert.deepStrictEqual(object.deepMerge({}, []), {});
	});
	mocha.it("Should keep the value of the first object when the second one does not have corresponding key", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1, b: 2}, {a: "1"}), {a: "1", b: 2});
	});
	mocha.it("Should return the value of the second object when the first one does not have corresponding key", () => {
		assert.deepStrictEqual(object.deepMerge({a: 1}, {a: "1", b: 2}), {a: "1", b: 2});
	});
	mocha.it("Should correctly merge arrays", () => {
		assert.deepStrictEqual(object.deepMerge(["a", "b", "c"], [, "a", "b", "c"]), ["a", "a", "b", "c"]);
	});
	mocha.it("Should correctly merge object and array", () => {
		assert.deepStrictEqual(object.deepMerge(["a", "b", "c"], {a: 1, b: 2, c: 3}), {0: "a", 1: "b", 2: "c", a: 1, b: 2, c: 3});
	});
});

mocha.describe("deepSeal()", () => {
	mocha.it("Should recursively seal an object", () => {
		const o = stub();
		object.deepSeal(o);
		assert.equal(Object.isSealed(o), true);
		assert.equal(Object.isSealed(o.b), true);
		assert.equal(Object.isSealed(o.b.d), true);
	});
});

mocha.describe("deepFreeze()", () => {
	mocha.it("Should recursively freeze an object", () => {
		const o = stub();
		object.deepFreeze(o);
		assert.equal(Object.isFrozen(o), true);
		assert.equal(Object.isFrozen(o.b), true);
		assert.equal(Object.isFrozen(o.b.d), true);
	});
});

mocha.describe("deepPreventExtensions()", () => {
	mocha.it("Should recursively prevent extensions", () => {
		const o = stub();
		object.deepPreventExtensions(o);
		assert.equal(Object.isExtensible(o), false);
		assert.equal(Object.isExtensible(o.b), false);
		assert.equal(Object.isExtensible(o.b.d), false);
	});
});

mocha.describe("equal()", () => {

	mocha.describe("Nulls", () => {
		mocha.it("equal(null, null) == true", () => assert.equal(object.equal(null, null), true));
	});

	mocha.describe("Booleans", () => {
		mocha.it("Equal booleans == true", () => assert.equal(object.equal(true, true), true));
		mocha.it("Unequal booleans == false", () => assert.equal(object.equal(true, false), false));
	});

	mocha.describe("Numbers", () => {
		mocha.it("Equal numbers == true", () => assert.equal(object.equal(1, 1), true));
		mocha.it("Unequal numbers == false", () => assert.equal(object.equal(1, 2), false));
	});

	mocha.describe("Strings", () => {
		mocha.it("Equal strings == true", () => assert.equal(object.equal("a", "a"), true));
		mocha.it("Empty strings == true", () => assert.equal(object.equal("", ""), true));
		mocha.it("Unequal strings == false", () => assert.equal(object.equal("a", "b"), false));
		mocha.it("String with empty one == false", () => assert.equal(object.equal("a", ""), false));
	});

	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => assert.equal(object.equal([], []), true));
		mocha.it("Equal arrays == true", () => assert.equal(object.equal(["a"], ["a"]), true));
		mocha.it("Part with full array == -1", () => assert.equal(object.equal(["a"], ["a", "b"]), -1));
		mocha.it("Full with part array == 1", () => assert.equal(object.equal(["a", "b"], ["a"]), 1));
		mocha.it("Unequal arrays == false", () => assert.equal(object.equal(["a", "b"], ["b", "a"]), false));
		mocha.it("Equal complex arrays == true", () => assert.equal(object.equal(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => assert.equal(object.equal(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == -1", () => assert.equal(object.equal(partComplexArray, complexArray), -1));
		mocha.it("Full with part complex array == 1", () => assert.equal(object.equal(complexArray, partComplexArray), 1));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => assert.equal(object.equal({}, {}), true));
		mocha.it("Equal objects == true", () => assert.equal(object.equal({a: 1}, {a: 1}), true));
		mocha.it("Part with full object == -1", () => assert.equal(object.equal({a: 1}, {a: 1, b: 2}), -1));
		mocha.it("Full with part object == 1", () => assert.equal(object.equal({a: 1, b: 2}, {a: 1}), 1));
		mocha.it("Unequal objects == false", () => assert.equal(object.equal({a: 1}, {b: 2}), false));
		mocha.it("Equal complex objects == true", () => assert.equal(object.equal(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => assert.equal(object.equal(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == -1", () => assert.equal(object.equal(partComplexObject, complexObject), -1));
		mocha.it("Full with part complex object == 1", () => assert.equal(object.equal(complexObject, partComplexObject), 1));
	});

	mocha.describe("Mixed types with the same values", () => {
		mocha.it("equal(1, \"1\") == false", () => assert.equal(object.equal(1, "1"), false));
		mocha.it("equal(\"\", null) == false", () => assert.equal(object.equal("", null), false));
		mocha.it("equal([1], [\"1\"]) == false", () => assert.equal(object.equal([1], ["1"]), false));
		mocha.it("equal([], null) == false", () => assert.equal(object.equal([], null), false));
		mocha.it("equal({}, null) == false", () => assert.equal(object.equal({}, null), false));
	});
});

mocha.describe("partlyEqual()", () => {
	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => assert.equal(object.partlyEqual([], []), true));
		mocha.it("Equal arrays == true", () => assert.equal(object.partlyEqual(["a"], ["a"]), true));
		mocha.it("Part with full array == false", () => assert.equal(object.partlyEqual(["a"], ["a", "b"]), false));
		mocha.it("Full with part array == true", () => assert.equal(object.partlyEqual(["a", "b"], ["a"]), true));
		mocha.it("Unequal arrays == false", () => assert.equal(object.partlyEqual(["a", "b"], ["b", "a"]), false));
		mocha.it("Equal complex arrays == true", () => assert.equal(object.partlyEqual(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => assert.equal(object.partlyEqual(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == false", () => assert.equal(object.partlyEqual(partComplexArray, complexArray), false));
		mocha.it("Full with part complex array == true", () => assert.equal(object.partlyEqual(complexArray, partComplexArray), true));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => assert.equal(object.partlyEqual({}, {}), true));
		mocha.it("Equal objects == true", () => assert.equal(object.partlyEqual({a: 1}, {a: 1}), true));
		mocha.it("Part with full object == false", () => assert.equal(object.partlyEqual({a: 1}, {a: 1, b: 2}), false));
		mocha.it("Full with part object == true", () => assert.equal(object.partlyEqual({a: 1, b: 2}, {a: 1}), true));
		mocha.it("Unequal objects == false", () => assert.equal(object.partlyEqual({a: 1}, {b: 2}), false));
		mocha.it("Equal complex objects == true", () => assert.equal(object.partlyEqual(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => assert.equal(object.partlyEqual(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == false", () => assert.equal(object.partlyEqual(partComplexObject, complexObject), false));
		mocha.it("Full with part complex object == true", () => assert.equal(object.partlyEqual(complexObject, partComplexObject), true));
	});
});

mocha.describe("strictlyEqual()", () => {
	mocha.describe("Arrays", () => {
		mocha.it("Empty arrays == true", () => assert.equal(object.strictlyEqual([], []), true));
		mocha.it("Equal arrays == true", () => assert.equal(object.strictlyEqual(["a"], ["a"]), true));
		mocha.it("Part with full array == false", () => assert.equal(object.strictlyEqual(["a"], ["a", "b"]), false));
		mocha.it("Full with part array == false", () => assert.equal(object.strictlyEqual(["a", "b"], ["a"]), false));
		mocha.it("Unequal arrays == false", () => assert.equal(object.strictlyEqual(["a"], ["b"]), false));
		mocha.it("Equal complex arrays == true", () => assert.equal(object.strictlyEqual(complexArray, complexArrayCopy), true));
		mocha.it("Unequal complex arrays == false", () => assert.equal(object.strictlyEqual(complexArray, diffComplexArray), false));
		mocha.it("Part with full complex array == false", () => assert.equal(object.strictlyEqual(partComplexArray, complexArray), false));
		mocha.it("Full with part complex array == false", () => assert.equal(object.strictlyEqual(complexArray, partComplexArray), false));
	});

	mocha.describe("Objects", () => {
		mocha.it("Empty objects == true", () => assert.equal(object.strictlyEqual({}, {}), true));
		mocha.it("Equal objects == true", () => assert.equal(object.strictlyEqual({a: 1}, {a: 1}), true));
		mocha.it("Part with full object == false", () => assert.equal(object.strictlyEqual({a: 1}, {a: 1, b: 2}), false));
		mocha.it("Full with part object == false", () => assert.equal(object.strictlyEqual({a: 1, b: 2}, {a: 1}), false));
		mocha.it("Unequal objects == false", () => assert.equal(object.strictlyEqual({a: 1}, {b: 2}), false));
		mocha.it("Equal complex objects == true", () => assert.equal(object.strictlyEqual(complexObject, complexObjectCopy), true));
		mocha.it("Unequal complex objects == false", () => assert.equal(object.strictlyEqual(complexObject, diffComplexObject), false));
		mocha.it("Part with full complex object == false", () => assert.equal(object.strictlyEqual(partComplexObject, complexObject), false));
		mocha.it("Full with part complex object == false", () => assert.equal(object.strictlyEqual(complexObject, partComplexObject), false));
	});
});

mocha.describe("clone()", () => {
	mocha.describe("Primitives", () => {
		mocha.it("clone(null) === null", () => assert.equal(object.clone(null), null));
		mocha.it("clone(true) === true", () => assert.equal(object.clone(true), true));
		mocha.it("clone(1) === 1", () => assert.equal(object.clone(1), 1));
		mocha.it("clone(\"a\") === \"a\"", () => assert.equal(object.clone("a"), "a"));
	});

	mocha.describe("Arrays", () => {
		mocha.it("Returns equal object", () => assert.deepStrictEqual(object.clone(complexArray), complexArrayCopy));
		mocha.it("Returns different reference", () => assert.equal(object.clone(complexArray) !== complexArray, true));
	});

	mocha.describe("Objects", () => {
		mocha.it("Returns equal object", () => assert.deepStrictEqual(object.clone(complexObject), complexObjectCopy));
		mocha.it("Returns different reference", () => assert.equal(object.clone(complexObject) !== complexObject, true));
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
