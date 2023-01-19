const REGEX_MIME = /^(\*|[a-z0-9_-]+)\/(\*|[a-z0-9_-]+)$/

// TODO: Documentation, tests
export function is(type: string, mime: string): boolean {
	const typeMatch = match(type);
	const mimeMatch = match(mime);
	return typeMatch != null && mimeMatch != null && (typeMatch[0] === "*" || typeMatch[0] === mimeMatch[0] && (typeMatch[1] === "*" || typeMatch[1] === mimeMatch[1]));
}

function match(mime: string): [type: string, subtype: string] | null {
	const matches = mime.match(REGEX_MIME);
	return matches ? [matches[1], matches[2]] : null;
}