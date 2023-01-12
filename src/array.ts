import * as object from "./object";

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
