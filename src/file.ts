/**
 * Returns the base filename without file extension.
 * @param fileName The name from which to extract the base name.
 * @returns The base name.
 * @example
 * ```ts
 * base("file.txt");     // "file"
 * base("file.ext.txt"); // "file.ext"
 * base("file");         // "file"
 * base(".txt");         // ""
 * ```
 */
export function base(fileName: string): string {
	return __split(fileName)[0];
}

/**
 * Returns filename extension without the dot.
 * @param fileName The filename from which to retrieve an extension.
 * @returns Extension name without leading dot.
 * @example
 * ```ts
 * ext("file.txt");     // "txt"
 * ext("file.ext.txt"); // "txt"
 * ext("file");         // ""
 * ext(".txt");         // "txt"
 * ```
 */
export function ext(fileName: string): string {
	return __split(fileName)[1];
}

function __split(fileName: string): [base: string, ext: string] {
	const parts = fileName.split(".");
	const ext = parts.length > 1 ? parts.pop()! : "";
	const base = parts.join(".");
	return [base, ext];
}
