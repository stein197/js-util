import type * as type from "@stein197/type";
import * as object from "./object";

/**
 * Checks if passed argument is an array.
 * @param arg Object to check.
 * @return `true` if the argument is an array.
 */
export function isArray(arg: any): arg is type.json.JsonArray {
	return Array.isArray(arg);
}

/**
 * Checks if passed argument is object and NOT an array.
 * @param arg Object to check.
 * @return `true` if the argument is an object literal.
 */
export function isObject(arg: any): arg is type.json.JsonObject {
	return object.isPlain(arg) && !isArray(arg);
}

/**
 * Checks if passed argument is empty. Argument considered as empty in following cases: empty string (""), empty object
 * ({}) and empty array ([]).
 * @param arg Object to check.
 * @returns `true` if the argument is empty
 */
export function isEmpty(arg: type.json.Json): boolean {
	const argType = typeof arg;
	return arg == null || (argType === "string" || argType === "object") && !Object.values(arg).length;
}

/**
 * Checks if the argument is plain JSON structure.
 * @param arg Argument to check.
 * @returns `true` if the object is valid plain JSON structure.
 */
export function valid(arg: any): arg is type.json.Json {
	if (arg == null)
		return true;
	const argType = typeof arg;
	if (argType === "boolean" || argType === "number" || argType === "string")
		return true;
	const isArray = Array.isArray(arg);
	const isObject = object.isPlain(arg);
	const hasSymbols = Object.getOwnPropertySymbols(arg).length > 0;
	if (!isArray && !isObject || hasSymbols)
		return false;
	for (const key in arg)
		if (!valid(arg[key]))
			return false;
	return true;
}
