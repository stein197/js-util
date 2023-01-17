import type {Json, JsonArray, JsonObject} from "@stein197/ts-util";

/**
 * Checks if passed argument is an array.
 * @param arg Object to check.
 * @return `true` if the argument is an array.
 */
export function isArray(arg: any): arg is JsonArray {
	return Array.isArray(arg);
}

/**
 * Checks if passed argument is object and NOT an array.
 * @param arg Object to check.
 * @return `true` if the argument is an object literal.
 */
export function isObject(arg: any): arg is JsonObject {
	return typeof arg === "object" && !isArray(arg);
}

/**
 * Checks if passed argument is empty. Argument considered as empty in following cases: empty string (""), empty object
 * ({}) and empty array ([]).
 * @param arg Object to check.
 * @returns `true` if the argument is empty
 */
export function isEmpty(arg: Json): boolean {
	const argType = typeof arg;
	return arg == null || (argType === "string" || argType === "object") && !Object.values(arg).length;
}

/**
 * Checks if the argument is plain JSON structure.
 * @param arg Argument to check.
 * @returns `true` if the object is valid plain JSON structure.
 */
export function valid(arg: any): arg is Json {
	if (arg == null)
		return true;
	const argType = typeof arg;
	if (argType === "boolean" || argType === "number" || argType === "string")
		return true;
	const argProto = Object.getPrototypeOf(arg);
	const isArray = Array.isArray(arg);
	const isObject = !argProto || argProto === Object.prototype;
	const hasSymbols = Object.getOwnPropertySymbols(arg).length > 0;
	if (!isArray && !isObject || hasSymbols)
		return false;
	for (const key in arg)
		if (!valid(arg[key]))
			return false;
	return true;
}
