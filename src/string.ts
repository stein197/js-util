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
 export function escape(s: string, char: string = "\"", chars: string[] = CHARS_ESCAPE): string {
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
export function unescape(s: string, char: string = "\""): string {
	let result = "";
	for (let i = 0, c = s[i]; i < s.length; c = s[++i])
		result += c === char ? s[++i] : c;
	return result;
}

// TODO
export function format(s: string, ...args: any[]): string {}