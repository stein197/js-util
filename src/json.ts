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
