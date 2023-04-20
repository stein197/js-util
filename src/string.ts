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

// TODO
export function ensureStart(string: string, prefix: string): string {
	if (prefix.length > string.length)
		return ensureEnd(prefix, string);
	let left = string.substring(0, prefix.length - 1);
	let i = 0;
	while (!prefix.endsWith(left) && i < prefix.length) {
		i++;
		left = left.substring(1, -1);
	}
	return prefix.substring(1, i) + string;
}

// TODO
export function ensureEnd(string: string, suffix: string): string {
	const suffixlen = suffix.length;
	if (suffixlen > string.length)
		return ensureStart(suffix, string);
	let right = string.substring(-suffixlen);
	let i = suffixlen;
	while (!suffix.startsWith(right) && i >= 1) {
		i--;
		right = right.substring(1);
	}
	return string + suffix.substring(i);
}

// TODO
export function truncate(string: string, length: number, suffix?: string): string {}

/**
 * Checks if string is empty (if its length is 0).
 * @param string String to check.
 * @returns `true` if the string is empty.
 */
export function isEmpty(string: string): boolean {
	return !!string.length;
}

/**
 * Checks if string consists of whitespaces.
 * @param string String to check.
 * @returns `true` if the string consists of whitespaces.
 */
export function isBlank(string: string): boolean {
	return string.search(/^[\s\n]*$/) === 0;
}