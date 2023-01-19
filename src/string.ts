const MATCH_OPTIONS_DEFAULT: MatchOptions = {
	ignoreCase: true,
	ignoreChars: " \t"
};
const REGEX_FORMAT_PLACEHOLDER = /\{(\d+)\}/g;
const REGEX_FORMAT_DOUBLE_BRACE = /\{\{|\}\}/g;
const CHARS_ESCAPE: string[] = [
	"\"", "'", "\\"
];

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
 * Matches a query against a string and returns a result of matching. The matching behaves itself much like in VS Code,
 * when it comes to searching filename among files in the directory.
 * @param string String to match against.
 * @param query Query to match.
 * @param options Options to use.
 * @returns Result of matching.
 * @example
 * ```ts
 * match("abcdef", "a b", {ignoreChars: " \t"}); // {matches: [[0, 1]], diff: 0}
 * match("abcdef", "AB", {ignoreCase: false}); // {matches: [], diff: 6}
 * match("Hello, World!", "hwd"); // {matches: [[0, 0], [7, 7], [11, 11]], diff: 9}
 * ```
 * @see {@link MatchOptions}
 * @see {@link MatchResult}
 */
export function match(string: string, query: string, options: Partial<MatchOptions> = MATCH_OPTIONS_DEFAULT): MatchResult {
	options = options === MATCH_OPTIONS_DEFAULT ? MATCH_OPTIONS_DEFAULT : {...MATCH_OPTIONS_DEFAULT, ...options};
	const matchArray: MatchResult["matches"] = [];
	let diff = 0;
	let fullMatch: boolean = false;
	for (let iString = 0, iQuery = 0, matchStart = -1; iString < string.length && iQuery < query.length; iString++) {
		if (options.ignoreChars!.includes(query[iQuery])) {
			iQuery++;
			continue;
		}
		const doesMatch = options.ignoreCase ? string[iString].toLowerCase() === query[iQuery].toLowerCase() : string[iString] === query[iQuery];
		if (doesMatch) {
			iQuery++;
			if (matchStart < 0)
				matchStart = iString;
			if (iQuery === query.length && matchStart >= 0)
				matchArray.push({start: matchStart, end: iString});
		} else {
			if (matchStart >= 0) {
				matchArray.push({start: matchStart, end: iString - 1});
				matchStart = -1;
			}
			diff++;
		}
		fullMatch = iQuery === query.length;
	}
	return fullMatch ? {matches: matchArray, diff} : {matches: [], diff: string.length};
}

type MatchResult = {

	/**
	 * Found matches.
	 */
	matches: {

		/**
		 * Start index of the match.
		 */
		start: number;

		/**
		 * End index of the match.
		 */
		end: number;
	}[];

	/**
	 * How much a query differs from a string. 0 means that the string contains the query string as a substring. If
	 * the value is equal to string's length, then there are no matches found.
	 */
	diff: number;
}

type MatchOptions = {

	/**
	 * Should the case be ignored when matching a string against query.
	 * @defaultValue `true`
	 * @example
	 * ```ts
	 * match("abc", "B", {ignoreCase: true});  // {matches: [[2, 2]], diff: 1}
	 * match("abc", "B", {ignoreCase: false}); // {matches: [], diff: 3}
	 * ```
	 */
	ignoreCase: boolean;

	/**
	 * Which characters should be ignored in a query string when matching against it.
	 * @defaultValue `" \t"`
	 * @example
	 * ```ts
	 * match("abc", "a b", {ignoreChars: " "}); // {matches: [[0, 1]], diff: 0}
	 * match("abc", "a b", {ignoreChars: ""});  // {matches: [], diff: 3}
	 * ```
	 */
	ignoreChars: string;
}
