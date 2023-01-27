const REGEX_MIME = /^(\*|[a-z0-9_-]+)\/(\*|[a-z0-9_-]+)$/

/**
 * Checks if mime matches passed type.
 * @param type Base type against which to compare the mime.
 * @param mime Mime to check.
 * @returns `true` if mime matches the type.
 * @example
 * ```ts
 * is("text/plain", "text/plain");   // true
 * is("text/*", "text/plain");       // true
 * is("text/*", "application/json"); // false
 * ```
 */
export function is(type: string, mime: string): boolean {
	const typeMatch = match(type);
	const mimeMatch = match(mime);
	return typeMatch != null && mimeMatch != null && (typeMatch[0] === "*" && typeMatch[1] === "*" || typeMatch[0] === mimeMatch[0] && (typeMatch[1] === "*" || typeMatch[1] === mimeMatch[1]));
}

function match(mime: string): [type: string, subtype: string] | null {
	const matches = mime.match(REGEX_MIME);
	return matches ? [matches[1], matches[2]] : null;
}