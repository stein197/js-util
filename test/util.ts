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

describe("util.track()", () => {
	it("Should behave the same way as the original one", () => {
		const f = (a, b) => a + b;
		const t = util.track(f);
		assert.equal(t(1, 2), 3);
	});
	it("\"this\" should be correct when tracking a function as an object property", () => {
		const o = {a: 12, b: function() {return this;}};
		const t = util.track(o.b);
		o.b = t;
		assert.equal(o.b(), o);
	});
	it("\"this\" should be correct when tracking a function as a class method", () => {
		class A {
			b() {
				return this;
			}
		}
		const t = util.track(A.prototype.b);
		A.prototype.b = t;
		const o = new A;
		assert.equal(o.b(), o);
	});
	it("\"this\" should be correct when the function was bound", () => {
		function a(this: any) {
			return this;
		}
		const b = a.bind("string");
		const t = util.track(b);
		assert.equal(t(), "string");
	});
	describe("data", () => {
		it("Should return empty array right after initialization", () => {
			const t = util.track(() => {});
			assert.deepStrictEqual(t.data, []);
		});
		it("Should return correct array after calling the function", () => {
			const f = (a, b) => a + b;
			const t = util.track(f);
			t(1, 2);
			t(3, 4);
			assert.deepStrictEqual(t.data, [
				[[1, 2], 3],
				[[3, 4], 7]
			]);
		});
	});
});

// TODO: Replace all test functions with single cumulate()
describe("util.memoize()", () => {
	function make<T extends (...args: any[]) => any>(f: T, hasher?: any): [ReturnType<typeof util.memoize<ReturnType<typeof util.track<T>>>>, ReturnType<typeof util.track<T>>["data"]] {
		const fTrack = util.track(f);
		const fMem = util.memoize(fTrack, hasher);
		return [fMem, fTrack.data];
	}
	it.skip("Should preserve \"this\" object refence");
	describe("No arguments", () => {
		it("Memoized function should always return correct result", () => {
			const [fMem] = make(() => 10);
			assert.equal(fMem(), 10);
			assert.equal(fMem(), 10);
			assert.equal(fMem(), 10);
		});
		it("Memoized function shouldn't be called in subsequent calls when the arguments are the same", () => {
			const [fMem, data] = make(() => 10);
			fMem();
			fMem();
			fMem();
			assert.deepStrictEqual(data, [[[], 10]]);
		});
	});
	describe("Single argument", () => {
		it("Memoized function should always return correct result", () => {
			const [fMem] = make(num => num + num);
			assert.equal(fMem(5), 10);
			assert.equal(fMem(10), 20);
			assert.equal(fMem(5), 10);
			assert.equal(fMem(10), 20);
		});
		it("Memoized function shouldn't be called in subsequent calls when the arguments are the same", () => {
			const [fMem, data] = make(num => num + num);
			fMem(5);
			assert.deepStrictEqual(data, [[[5], 10]]);
			fMem(5);
			assert.deepStrictEqual(data, [[[5], 10]]);
		});
		it("Memoized function should be called in subsequent calls when the arguments aren't the same", () => {
			const [fMem, data] = make(num => num + num);
			fMem(5);
			assert.deepStrictEqual(data, [[[5], 10]]);
			fMem(10);
			assert.deepStrictEqual(data, [[[5], 10], [[10], 20]]);
		});
	});
	describe("Many arguments", () => {
		it("Memoized function should always return correct result", () => {
			const [fMem] = make((a, b, c) => a + b + c);
			assert.equal(fMem(1, 2, 3), 6);
			assert.equal(fMem(4, 5, 6), 15);
			assert.equal(fMem(1, 2, 3), 6);
			assert.equal(fMem(4, 5, 6), 15);
		});
		it("Memoized function shouldn't be called in subsequent calls when the arguments are the same", () => {
			const [fMem, data] = make((a, b, c) => a + b + c);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6]]);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6]]);
		});
		it("Memoized function should be called in subsequent calls when the arguments aren't the same", () => {
			const [fMem, data] = make((a, b, c) => a + b + c);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6]]);
			fMem(4, 5, 6);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[4, 5, 6], 15]]);
		});
	});
	describe("Arguments length grows", () => {
		it("Memoized function should always return correct result", () => {
			const [fMem] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			assert.equal(fMem(), 0);
			assert.equal(fMem(1), 1);
			assert.equal(fMem(1, 2), 3);
			assert.equal(fMem(1, 2, 3), 6);
		});
		it("Memoized function shouldn't be called in subsequent calls and return correct result when the arguments are the same", () => {
			const [fMem, data] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			fMem();
			assert.deepStrictEqual(data, [[[], 0]]);
			fMem(1);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1]]);
			fMem(1, 2);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3]]);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6]]);
			fMem();
			fMem(1);
			fMem(1, 2);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6]]);
		});
		it("Memoized function should be called in subsequent calls and return correct result when the arguments aren't the same", () => {
			const [fMem, data] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			fMem();
			assert.deepStrictEqual(data, [[[], 0]]);
			fMem(1);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1]]);
			fMem(1, 2);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3]]);
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6]]);
			fMem();
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6]]);
			fMem(4);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6], [[4], 4]]);
			fMem(4, 5);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6], [[4], 4], [[4, 5], 9]]);
			fMem(4, 5, 6);
			assert.deepStrictEqual(data, [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6], [[4], 4], [[4, 5], 9], [[4, 5, 6], 15]]);
		});
	});
	describe("Arguments length lessens", () => {
		it("Memoized function should always return correct result", () => {
			const [fMem] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			assert.equal(fMem(1, 2, 3), 6);
			assert.equal(fMem(1, 2), 3);
			assert.equal(fMem(1), 1);
			assert.equal(fMem(), 0);
		});
		it("Memoized function shouldn't be called in subsequent calls and return correct result when the arguments are the same", () => {
			const [fMem, data] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6]]);
			fMem(1, 2);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3]]);
			fMem(1);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1]]);
			fMem();
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0]]);
			fMem(1, 2, 3);
			fMem(1, 2);
			fMem(1);
			fMem();
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0]]);
		});
		it("Memoized function should be called in subsequent calls and return correct result when the arguments aren't the same", () => {
			const [fMem, data] = make((...args: number[]) => args.reduce((prev, cur) => prev + cur, 0));
			fMem(1, 2, 3);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6]]);
			fMem(1, 2);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3]]);
			fMem(1);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1]]);
			fMem();
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0]]);
			fMem(4, 5, 6);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0], [[4, 5, 6], 15]]);
			fMem(4, 5);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0], [[4, 5, 6], 15], [[4, 5], 9]]);
			fMem(4);
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0], [[4, 5, 6], 15], [[4, 5], 9], [[4], 4]]);
			fMem();
			assert.deepStrictEqual(data, [[[1, 2, 3], 6], [[1, 2], 3], [[1], 1], [[], 0], [[4, 5, 6], 15], [[4, 5], 9], [[4], 4]]);
		});
	});
	describe("Using hasher function", () => {
		let lastID = 0;
		const SYMBOL_USER_ID = Symbol();
		function createUser(name: string, age: number) {
			const u = {name, age, [SYMBOL_USER_ID]: lastID++};
			Object.defineProperty(u, "id", {
				get() {
					return this[SYMBOL_USER_ID];
				}
			})
			return u;
		}
		beforeEach(() => lastID = 0);
		it("Should return incorrect results when function needs a custom hash function", () => {
			const u1 = createUser("John", 12);
			const u2 = createUser("John", 12);
			const [fMem, data] = make(user => `id: ${user.id}, name: ${user.name}, age: ${user.age}`);
			assert.equal(fMem(u1), "id: 0, name: John, age: 12");
			assert.equal(fMem(u2), "id: 0, name: John, age: 12");
			assert.deepStrictEqual(data, [[[u1], "id: 0, name: John, age: 12"]]);
		});
		it("Should use hasher function", () => {
			const u1 = createUser("John", 12);
			const u2 = createUser("John", 12);
			const hasher = util.track(user => user.id.toString());
			const [fMem, data] = make(user => `id: ${user.id}, name: ${user.name}, age: ${user.age}`, hasher);
			assert.equal(fMem(u1), "id: 0, name: John, age: 12");
			assert.equal(fMem(u2), "id: 1, name: John, age: 12");
			assert.deepStrictEqual(data, [[[u1], "id: 0, name: John, age: 12"], [[u2], "id: 1, name: John, age: 12"]]);
			assert.deepStrictEqual(hasher.data, [[[u1], "0"], [[u2], "1"]]);
		});
	});
});

describe("util.except()", () => {
	let f: ReturnType<typeof util.track>;
	beforeEach(() => f = util.track(() => {}));
	describe("except(...)", () => {
		it("The function passed to except() should always be called", () => {
			util.except(f);
			assert.equal(f.data.length, 1);
		});
		it("Should happen nothing when the callback in except() throws an error", () => {
			assert.doesNotThrow(() => util.except(() => {
				throw new Error()
			}));
		});
	});
	describe("except(...).catch(...)", () => {
		it("catch() should be called when an error is thrown in except()", () => {
			util.except(() => {
				throw new Error();
			}).catch(f);
			assert.equal(f.data.length, 1);
		});
		it("catch() should not be called when there weren't any errors in except()", () => {
			util.except(() => {}).catch(f);
			assert.equal(f.data.length, 0);
		});
		it("catch() should accept the error object thrown in except()", () => {
			util.except(() => {
				throw "error";
			}).catch(f);
			assert.equal(f.data[0][0], "error");
		});
		it("The next catch() should be called when an error is thrown in the previous catch()", () => {
			util.except(() => {
				throw new Error();
			}).catch(() => {
				throw "error";
			}).catch(f);
			assert.equal(f.data.length, 1);
		});
		it("The next catch() should not be called when there weren't any errors in the previous catch()", () => {
			util.except(() => {
				throw new Error();
			}).catch(() => {}).catch(f);
			assert.equal(f.data.length, 0);
		});
		it("The next catch() should accept the error object thrown in the previous catch()", () => {
			util.except(() => {
				throw new Error();
			}).catch(() => {
				throw "error";
			}).catch(f);
			assert.equal(f.data[0][0], "error");
		});
	});
	describe("except(...).finally(...)", () => {
		it("finally() should be called when an error is thrown in except()", () => {
			util.except(() => {
				throw "error";
			}).finally(f);
			assert.equal(f.data.length, 1);
		});
		it("finally() should be called when there weren't any errors in except()", () => {
			util.except(() => {}).finally(f);
			assert.equal(f.data.length, 1);
		});
	});
	describe("except(...).catch(...).finally(...)", () => {
		it("All callbacks should be called when an error is thrown in except()", () => {
			const f1 = util.track(() => {});
			const f2 = util.track(() => {});
			util.except(() => {
				throw "error";
			}).catch(f1).finally(f2);
			assert.equal(f1.data.length, 1);
			assert.equal(f2.data.length, 1);
		});
		it("Only except() and finally() should be called when there weren't any errors in except()", () => {
			const f1 = util.track(() => {});
			const f2 = util.track(() => {});
			util.except(() => {}).catch(f1).finally(f2);
			assert.equal(f1.data.length, 0);
			assert.equal(f2.data.length, 1);
		});
	});
});