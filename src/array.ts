/**
 * Returns a difference between arrays.
 * @param array An array from which to subtract elements.
 * @param subtrahend An array of elements to subtract from the first one.
 * @returns Difference between arrays.
 * @example
 * ```ts
 * diff(["a", "b", "c"], ["b"]); // ["a", "c"]
 * ```
 */
export function diff<T>(array: T[], subtrahend: T[]): T[] {
	const result: T[] = [];
	for (const item of array)
		if (subtrahend.indexOf(item) < 0)
			result.push(item);
	return result;
}

/**
 * Removes duplicates from the array.
 * @param array An array which elements to filter out.
 * @returns An array with elements that do not occur more than once.
 * @example
 * ```ts
 * uniq(["a", "b", "a"]); // ["a", "b"]
 * ```
 */
export function uniq<T>(array: T[]): T[] {
	return array.filter((v, i, a) => a.indexOf(v) === i);
}
