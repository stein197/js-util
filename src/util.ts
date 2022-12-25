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
