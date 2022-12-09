import * as assert from "assert";
import * as mocha from "mocha";
import * as object from "../src/object";

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
