const REGEX_FORMAT_PLACEHOLDER = /\{(\d+)\}/g;
const REGEX_FORMAT_DOUBLE_BRACE = /\{\{|\}\}/g;
const CHARS_ESCAPE: string[] = [
	"\"", "'", "\\"
];
const BOOLEAN_COUNTERPARTS = {
	1: "0",
	true: "false",
	yes: "no",
	on: "off",
	y: "n"
}

/**
 * Adds backslashes before `"`, `'` and `\` characters. The opposite of {@link unescape}
 * @param s String to escape.
 * @param char Escape character. `\` by default.
 * @param chars Characters to escape. `["\"", "'", "\\"]` by default.
 * @returns String with escaped characters.
 * @example
 * ```ts
 * escape("String with \"quotes\""); // "String with \\\"quotes\\\""
 * ```
 */
export function escape(s: string, char: string = "\\", chars: string[] = CHARS_ESCAPE): string {
	let result = "";
	for (const c of s)
		result += chars.includes(c) ? char + c : c;
	return result;
}

/**
 * Strips backslashes from the string. The opposite of {@link escape}
 * @param s String to unescape.
 * @param char Escape character. `\` by default.
 * @returns Unescaped string with stripped escape character.
 * @example
 * ```ts
 * unescape("String with \\\"quotes\\\""); "String with \"quotes\""
 * ```
 */
export function unescape(s: string, char: string = "\\"): string {
	let result = "";
	for (let i = 0, c = s[i]; i < s.length; c = s[++i])
		result += c === char ? s[++i] : c;
	return result;
}

/**
 * Formats the given string using passed arguments. Format string uses numeric zero-indexed placeholders enclosed in
 * curly braces. Double braces to escape them.
 * @param s Format string.
 * @param args Arguments to replace placeholders in the string.
 * @returns Formatted string.
 * @example
 * ```ts
 * format("Hello, {0}", "user"); // "Hello, user"
 * ```
 */
export function format(s: string, ...args: any[]): string {
	return s.replace(REGEX_FORMAT_DOUBLE_BRACE, match => match === "{{" ? "{" : "}").replace(REGEX_FORMAT_PLACEHOLDER, (...[, index]) => args[index] == null ? "" : args[index]);
}

/**
 * Converts boolean-like string into real booleans or null if the convertation cannot be done. Case-insensitive.
 * Possible strings are "1", "true", "yes", "on", "y" and their contraries.
 * @param value String to convert to a boolean.
 * @returns Corresponding boolean or null of the convertation cannot be done.
 * @example
 * ```ts
 * toBoolean("true");   // true
 * toBoolean("off");    // false
 * toBoolean("string"); // null
 * ```
 */
export function toBoolean(value: string): boolean | null {
	value = value.toLowerCase();
	if (value in BOOLEAN_COUNTERPARTS)
		return true;
	for (const k in BOOLEAN_COUNTERPARTS)
		if (value === BOOLEAN_COUNTERPARTS[k])
			return false;
	return null;
}

/**
 * If the string starts with specified prefix then returns string itself, otherwise pads the string until it starts with
 * the prefix.
 * @param string String to ensure.
 * @param prefix String to ensure this string starts with.
 * @returns String that starts with specified prefix.
 * @example
 * ```ts
 * ensureStart("https://domain.com", "https://"); // "https://domain.com"
 * ensureStart("//domain.com", "https://");       // "https://domain.com"
 * ```
 */
export function ensureStart(string: string, prefix: string): string {
	let result = string;
	for (let i = 1; i <= prefix.length && !result.startsWith(prefix); i++)
		result = prefix.slice(0, i) + string;
	return result;
}

/**
 * If the string ends with specified suffix then returns string itself, otherwise pads the string until it ends with the
 * suffix.
 * @param string String to ensure
 * @param suffix String to ensure this string ends with.
 * @returns String that ends with specified prefix.
 * @example
 * ```ts
 * ensureEnd("/path?query", "?query"); // "/path?query"
 * ensureEnd("/path?", "?query");      // "/path?query"
 * ```
 */
export function ensureEnd(string: string, suffix: string): string {
	let result = string;
	for (let i = 1; i <= suffix.length && !result.endsWith(suffix); i++)
		result = string + suffix.slice(-i);
	return result;
}

/**
 * Truncates string to a specified length with optional suffix.
 * @param string String to truncate.
 * @param length Length to which to truncate the string.
 * @param suffix Optional string that will be added at the end.
 * @returns Truncated string.
 * @example
 * ```ts
 * truncate("Hello, World!", 10); // "Hello, Wor"
 * truncate("Hello, World!", 13, "..."); // "Hello, Wor..."
 * ```
 */
export function truncate(string: string, length: number, suffix?: string): string {
	if (!suffix)
		return string.substring(0, length);
	const newLength = length - suffix.length;
	return 0 < newLength && newLength < string.length ? string.substring(0, newLength) + suffix : string.substring(0, length);
}

/**
 * Checks if string is empty (if its length is 0).
 * @param string String to check.
 * @returns `true` if the string is empty.
 * @example
 * ```ts
 * isEmpty(""); // true
 * ```
 */
export function isEmpty(string: string): boolean {
	return !string.length;
}

/**
 * Checks if string consists of whitespaces.
 * @param string String to check.
 * @returns `true` if the string consists of whitespaces.
 * @example
 * ```ts
 * isBlank(" \t\n"); // true
 * ```
 */
export function isBlank(string: string): boolean {
	return string.search(/^[\s\n]*$/) === 0;
}