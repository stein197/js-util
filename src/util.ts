import type {tuple} from "@stein197/ts-util";

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
export function curry<T extends (...args: any[]) => any, Args extends tuple.Optional<Parameters<T>> = tuple.Optional<Parameters<T>>>(f: T, ...init: Args): (...args: tuple.TrimStart<Parameters<T>, Args["length"]>) => ReturnType<T> {
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
export function random(min: number, max: number): number {
	return Math.round(min + Math.random() * (max - min));
}

type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
}
