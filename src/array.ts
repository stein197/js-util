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
 * uniq(["a", "b", "a"]);          // ["a", "b"]
 * uniq([{a: 1}, {b: 2}, {a: 1}]); // [{a: 1}, {b: 2}]
 * ```
 */
export function uniq<T>(array: T[], deep: boolean = false): T[] {
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
