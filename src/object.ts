/**
 * Same as {@link Object.seal} but performs the sealing recursively.
 * @param object Object to seal.
 */
export function deepSeal(object: any): void {
	applyRecursive(Object.seal, object);
}

/**
 * Same as {@link Object.freeze} but performs the freezing recursively.
 * @param object Object to freeze.
 */
export function deepFreeze(object: any): void {
	applyRecursive(Object.freeze, object);
}

/**
 * Same as {@link Object.preventExtensions} but performs the prevention recursively.
 * @param object Object to prevent extensions of.
 */
export function deepPreventExtensions(object: any): void {
	applyRecursive(Object.preventExtensions, object);
}

/**
 * Checks if two objects are deeply equal. It makes partial comparison.
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns `true` if both objects are strictly deeply equal, `-1` if the first object is a subset of the second one,
 *          `1` if the second one is a subset of the first one and `false` otherwise.
 */
export function equal(a: any, b: any): -1 | 1 | boolean {
	if (a === b)
		return true;
	if (a != null && b != null && typeof a === "object" && typeof b === "object") {
		const aEntries = Object.entries(a);
		const bEntries = Object.entries(b);
		let minorEntries: [string, any][];
		let majorObject: any;
		if (aEntries.length < bEntries.length) {
			minorEntries = aEntries;
			majorObject = b;
		} else {
			minorEntries = bEntries;
			majorObject = a;
		}
		const returnValue = aEntries.length === bEntries.length ? true : (aEntries.length < bEntries.length ? -1 : 1);
		const result = minorEntries.map(entry => entry[0] in majorObject ? equal(majorObject[entry[0] as any], entry[1]) : false).reduce((acc, v) => acc === true || acc === v ? v : false, true);
		return aEntries.length === bEntries.length ? result : (result ? returnValue : false);
	}
	return false;
}

/**
 * Checks if two objects are deeply and partly equal.
 * @param base Base object to compare with.
 * @param part Partial object of the first one.
 * @returns `true` if the second object is a subset of the second one.
 */
export function partlyEqual(base: any, part: any): boolean {
	const result = equal(base, part);
	return +result > 0;
}

/**
 * Checks if two objects are deeply and strictly equal.
 * @param a First object to compare.
 * @param b Second object to compare.
 * @returns `true` if both objects are strictly deeply equal.
 */
export function strictlyEqual(a: any, b: any): boolean {
	return equal(a, b) === true;
}

/**
 * Perform deep object clone.
 * @param arg Object to clone.
 * @returns Cloned object.
 */
export function clone<T>(arg: T): T {
	if (typeof arg !== "object" || arg == null)
		return arg;
	const result: any = Array.isArray(arg) ? new Array(arg.length) : {}
	for (const [key, value] of Object.entries(arg!))
		result[key] = clone(value);
	return result;
}

function applyRecursive(f: (o: any) => void, object: any): void {
	if (object == null || typeof object !== "object")
		return;
	for (const key in object)
		applyRecursive(f, object[key]);
	f(object);
}