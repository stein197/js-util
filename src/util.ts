import type * as type from "@stein197/type";

const TYPE_PRIMITIVE: string[] = [
	"boolean",
	"number",
	"string",
	"bigint"
];

/**
 * Curries the passed function by reducing the amount of arguments that the function needs.
 * @param f Function to curry.
 * @param init Initial arguments.
 * @returns The curried function.
 * @example
 * ```ts
 * function fn(a: boolean, b: number, c: string): string {
 * 	return `a: ${a}, b: ${b}, c: ${c}`;
 * }
 * const curried = curry(fn, true, 1);
 * curried("string"); // "a: true, b: 1, c: string"
 * ```
 */
export function curry<T extends (...args: any[]) => any, Args extends type.tuple.Optional<Parameters<T>> = type.tuple.Optional<Parameters<T>>>(f: T, ...init: Args): (...args: type.tuple.TrimStart<Parameters<T>, Args["length"]>) => ReturnType<T> {
	return (...args) => f(...init, ...args);
}

/**
 * Checks if the value is primitive.
 * @param value Value to test.
 * @returns `true` if the value is boolean, number, bigint or string.
 */
export function isPrimitive(value: any): value is boolean | number | bigint | string {
	const valueType = typeof value;
	return TYPE_PRIMITIVE.includes(valueType);
}

/**
 * Returns a promise that will resolve in {@link ms} milliseconds.
 * @param ms Amount of milliseconds after which the promise will be resolved.
 * @returns Promise that will resolve in {@link ms} milliseconds.
 * @example
 * ```ts
 * await sleep(10000);
 * console.log("10 seconds have passed!");
 * ```
 */
export function sleep(ms: number): Promise<void> {
	return new Promise(resolve => globalThis.setTimeout(resolve, ms));
}

/**
 * Checks if two rects intersect
 * @param rect1 First rect to check.
 * @param rect2 Second rect to check.
 * @returns `true` if rects intersect each other.
 * @example
 * ```ts
 * let rect1 = {x: 0, y: 0, width: 10, height: 10};
 * let rect2 = {x: 5, y: 5, width: 10, height: 10};
 * intersects(rect1, rect2); // true
 * ```
 */
export function intersects(rect1: Rect, rect2: Rect): boolean {
	const maxWidth = rect1.width + rect2.width;
	const maxHeight = rect1.height + rect2.height;
	const minX = Math.min(rect1.x, rect1.x + rect1.width, rect2.x, rect2.x + rect2.width);
	const maxX = Math.max(rect1.x, rect1.x + rect1.width, rect2.x, rect2.x + rect2.width);
	const minY = Math.min(rect1.y, rect1.y + rect1.height, rect2.y, rect2.y + rect2.height);
	const maxY = Math.max(rect1.y, rect1.y + rect1.height, rect2.y, rect2.y + rect2.height);
	const realWidth = maxX - minX;
	const realHeight = maxY - minY;
	return realWidth <= maxWidth && realHeight <= maxHeight;
}

/**
 * Generates random number between specified values (including them).
 * @param min Min value.
 * @param max Max value.
 * @returns Random value between specified bounds.
 */
export function random(min: number, max: number): number;

/**
 * Generates random number between 0 and the specified value (including it).
 * @param max Max value.
 * @returns Random value between 0 and the specified one.
 */
export function random(max: number): number;

export function random(a: number, b?: number): number {
	const min = b == null ? 0 : a;
	const max = b == null ? a : b;
	return Math.round(min + Math.random() * (max - min));
}

/**
 * Tracks the calls of the passed function.
 * @param f Function to track.
 * @returns Object that contains tracked function and info property.
 * @example
 * ```ts
 * const f = (a, b) => a + b;
 * const tracker = track(f);
 * tracker(1, 2);
 * tracker(3, 4);
 * tracker.data == [
 * 	[[1, 2], 3],
 * 	[[2, 3], 5]
 * ]
 * ```
 */
export function track<T extends (this: any, ...args: any[]) => any>(f: T): Tracker<T> {
	const data: [Parameters<T>, ReturnType<T>][] = [];
	return Object.assign(function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
		const result = f.call(this, ...args);
		data.push([args, result]);
		return result;
	}, Object.defineProperty({data: []}, "data", {
		get: () => data
	}));
}

/**
 * Takes a function and returns a memoized version of it.
 * @param f Function to memoize.
 * @param hasher A function that returns a hash based on passed arguments to the memoized function. By default,
 *               arguments are just stringified to make a JSON-string and use it as a hash.
 * @returns Memoized function.
 * @example
 * ```ts
 * const fMemo = memoize((a, b) => a + b);
 * fMemo(1, 2); // 3; calculated
 * fMemo(1, 2); // 3; taken from the cache
 * fMemo(2, 3); // 5; calculated
 * fMemo(2, 3); // 5; taken from the cache
 * 
 * // Use a custom hash function
 * const f = memoize(user => user.heavyOperation(), user => user.id);
 * f(user1); // calculated
 * f(user1); // taken from the cache using custom hasher function
 * ```
 */
export function memoize<T extends (...args: any[]) => any>(f: T, hasher?: (this: ThisParameterType<T>, ...args: Parameters<T>) => string): T {
	const cache = {};
	return function (this: any, ...args: Parameters<T>) {
		const key = hasher ? hasher.apply(this, args) : JSON.stringify(args);
		if (!(key in cache))
			cache[key] = f.apply(this, args);
		return cache[key];
	} as T;
}

/**
 * Wrapper around `try...catch` block that allows chaining of `catch` blocks.
 * @param f Function to be called.
 * @example
 * The classic way to handle multiple exceptions
 * ```ts
 * try {
 * 	func1();
 * } catch (1) {
 * 	try {
 * 		func2();
 * 	} catch (e2) {
 * 		func3();
 * 	}
 * } finally {
 * 	func4();
 * }
 * ```
 * @example
 * The same example but with {@link except} function instead
 * ```ts
 * except(() => {
 * 	func1();
 * }).catch(() => {
 * 	func2();
 * }).catch(() => {
 * 	func3();
 * }).finally(() => {
 * 	func4();
 * });
 * ```
 */
export function except(f: () => void): Except {
	let error: any = null;
	const obj = {
		catch(f: (e: any) => void) {
			if (error != null)
				try {
					f(error);
					error = null;
				} catch (e) {
					error = e;
				}
			return this;
		},
		finally(f: () => void) {
			f();
			error = null;
		}
	};
	try {
		f();
	} catch (e) {
		error = e;
	}
	return obj;
}

type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
}

type Tracker<T extends (this: any, ...args: any[]) => any> = {

	/**
	 * Tracked function.
	 * @param args Function arguments.
	 * @returns Result.
	 */
	(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>;

	/**
	 * Holds all tracked data with arguments and returned results.
	 */
	readonly data: [Parameters<T>, ReturnType<T>][];
}

type Except = {

	/**
	 * Run a function if the previous call to {@link except} or {@link Except.catch} threw an error.
	 * @param f Function to call.
	 * @returns This object.
	 */
	catch<T = any>(f: (error: T) => void): Except;

	/**
	 * Run a function after all previous operations.
	 * @param f Function to run.
	 */
	finally(f: () => void): void;
}
