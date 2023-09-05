import * as object from "./object";
import * as util from "./util";

/**
 * Returns a difference between arrays.
 * @param array An array from which to subtract elements.
 * @param subtrahend An array of elements to subtract from the first one.
 * @param deep Flag that toggles deep elements comparison. `false` by default (elements are compared by reference).
 * @returns Difference between arrays.
 * @example
 * ```ts
 * diff(["a", "b", "c"], ["b"]); // ["a", "c"]
 * ```
 */
export function diff<T>(array: T[], subtrahend: T[], deep: boolean = false): T[] {
	const result: T[] = [];
	for (const item of array)
		if (subtrahend.findIndex(element => deep ? object.strictlyEqual(element, item) : element === item) < 0)
			result.push(item);
	return result;
}

/**
 * Removes duplicates from the array.
 * @param array An array which elements to filter out.
 * @param deep Flag that toggles deep elements comparison. `false` by default (elements are compared by reference).
 * @returns An array with elements that do not occur more than once.
 * @example
 * ```ts
 * unique(["a", "b", "a"]);          // ["a", "b"]
 * unique([{a: 1}, {b: 2}, {a: 1}]); // [{a: 1}, {b: 2}]
 * ```
 */
export function unique<T>(array: T[], deep: boolean = false): T[] {
	return array.filter((v, i, a) => deep ? a.findIndex(item => object.strictlyEqual(item, v)) === i : a.indexOf(v) === i);
}

/**
 * Returns the random element of an array.
 * @param array An array from which to return an element.
 * @returns Random element or `undefined` if array is empty.
 * @example
 * ```ts
 * random(["a", "b", "c"]); // "b"
 * random([]);              // undefined
 * ```
 */
export function random<T>(array: T[]): T | undefined {
	return array.length ? array[util.random(array.length - 1)] : undefined;
}

/**
 * Shuffles the passed array
 * @param array Array to shuffle.
 * @returns The same array, but shuffled.
 * @example
 * ```ts
 * shuffle(["a", "b", "c"]); // ["c", "a", "b"]
 * ```
 */
export function shuffle<T>(array: T[]): T[] {
	return array.sort(() => Math.random() >= .5 ? 1 : -1);
}

/**
 * Chunks the array into pieces of specified {@link length}.
 * @param array Array to chunk.
 * @param length Length of a piece. Minimal value is 1.
 * @throws {Error} If {@link length} is less than 1.
 * @example
 * ```ts
 * chunk(["a", "b", "c", "d", "e"], 2); // [["a", "b"], ["c", "d"], ["e"]]
 * ```
 */
export function chunk<T>(array: T[], length: number): T[][] {
	if (length < 1)
		throw new Error(`Length value must be greater than 0. Specified value: ${length}`);
	const chunksCount = Math.ceil(array.length / length);
	const result = new Array<T[]>(chunksCount);
	for (let i = 0; i < result.length; i++) {
		const startIndex = length * i;
		result[i] = array.slice(startIndex, startIndex + length);
	}
	return result;
}

/**
 * Checks if the array is sparse.
 * @param array Array to check.
 * @returns `true` if the array is sparse.
 * @example
 * ```ts
 * isSparse(["a", "b", "c"]); // false
 * isSparse(["a", , "c"]);    // true
 * ```
 */
export function isSparse(array: any[]): boolean {
	for (let i = 0; i < array.length; i++)
		if (!(i in array))
			return true;
	return false;
}

/**
 * Returns the first element of the array or undefined if the array is empty.
 * @param array Array from which to return.
 * @returns The first element of the array or undefined if the array is empty.
 * @example
 * ```ts
 * first(["a", "b", "c"]); // "a"
 * first([]);              // undefined
 * ```
 */
export function first<T>(array: T[]): T | undefined {
	return array[0];
}

/**
 * Returns the last element of the array or undefined if the array is empty.
 * @param array Array from which to return.
 * @returns The last element of the array or undefined if the array is empty.
 * @example
 * ```ts
 * last(["a", "b", "c"]); // "c"
 * last([]);              // undefined
 * ```
 */
export function last<T>(array: T[]): T | undefined {
	return array[array.length - 1];
}

/**
 * Returns a value by the specified index. Basically, the same as {@link Array.at}. Accepts positive and negative
 * indices.
 * @param array The array whose element is to be returned.
 * @param index The index.
 * @returns Value by the index or `undefined` if there is no such an index.
 * @example
 * ```ts
 * get(["a", "b", "c"], -1); // "c"
 * ```
 */
export function get<T>(array: T[], index: number): T | undefined {
	return array[__getRealIndex(array.length, index)];
}

/**
 * Sets a value by the specified index. Accepts positive and negative indices.
 * @param array The array.
 * @param index The index.
 * @param value Value to set.
 * @example
 * ```ts
 * const a = ["a", "b", "c"];
 * set(a, -1, "C");
 * a; // ["a", "b", "C"]
 * ```
 */
export function set<T>(array: T[], index: number, value: T): void {
	array[__getRealIndex(array.length, index)] = value;
}

/**
 * Shift elements inside an array to the left or to the right. Elements that shifted off the array are placed at the
 * opposite side.
 * @param array Array to shift.
 * @param offset Index offset. Negative number shift the array to the left while the positive one shift to the right.
 * @example
 * ```ts
 * const a = ["a", "b", "c", "d", "e", "f"];
 * shift(a, -2);
 * console.log(a); // ["c", "d", "e", "f", "a", "b"]
 * shift(a, 4);
 * console.log(a); // ["e", "f", "a", "b", "c", "d"]
 * ```
 */
export function shift(array: any[], offset: number): void {
	array.unshift(...array.splice(-(offset % array.length)));
}

function __getRealIndex(length: number, index: number): number {
	return index >= 0 ? index : length + index;
}
