const REGEX_EXT = /\.([^\.]+)$/;

/**
 * Returns the base filename without file extension.
 * @param fileName The name from which to extract the base name.
 * @returns The base name.
 * @example
 * ```ts
 * getBase("file.txt");     // "file"
 * getBase("file.ext.txt"); // "file.ext"
 * getBase("file");         // "file"
 * getBase(".txt");         // ""
 * ```
 */
export function getBase(fileName: string): string {
	return fileName.replace(REGEX_EXT, "");
}

/**
 * Returns filename extension without the dot.
 * @param fileName The filename from which to retrieve an extension.
 * @returns Extension name without leading dot.
 * @example
 * ```ts
 * getExt("file.txt");     // "txt"
 * getExt("file.ext.txt"); // "txt"
 * getExt("file");         // ""
 * getExt(".txt");         // "txt"
 * ```
 */
export function getExt(fileName: string): string {
	const match = fileName.match(REGEX_EXT);
	return match ? match[1] : "";
}
