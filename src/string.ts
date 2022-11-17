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

/**
 * Formats the given string using passed arguments. Format string uses numeric zero-indexed placeholders enclosed in
 * curly braces. The placeholder braces can be escaped using backslash.
 * @param s Format string.
 * @param args Arguments to replace placeholders in the string.
 * @returns Formatted string.
 * @example
 * ```ts
 * format("Hello, {0}", "user"); // "Hello, user"
 * ```
 */
export function format(s: string, ...args: any[]): string {
	let result = "";
	let isEscape = false;
	let placeholder: string | null = null;
	for (const c of s) {
		if (c === "\\") {
			isEscape = true;
			continue;
		}
		switch (c) {
			case "{": {
				if (isEscape) {
					result += c;
				} else {
					placeholder = "";
				}
				break;
			}
			case "}": {
				if (isEscape || placeholder == null) {
					result += c;
				} else {
					result += String(args[+placeholder]);
					placeholder = null;
				}
				break;
			}
			default: {
				if (placeholder == null) {
					result += c;
				} else {
					placeholder += c;
				}
			}
		}
		isEscape = false;
	}
	if (placeholder != null)
		result += placeholder || "{";
	return result;
}
