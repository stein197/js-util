import * as string from "./string";

const UNIT_DECIMAL: string[] = [
	"B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"
];
const UNIT_BINARY: string[] = [
	"B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "RiB", "QiB"
];
const UNIT_DECIMAL_LOWERCASE = UNIT_DECIMAL.map(unit => unit.toLowerCase());
const UNIT_BINARY_LOWERCASE = UNIT_BINARY.map(unit => unit.toLowerCase());
const MULTIPLIER_DECIMAL = 1000;
const MULTIPLIER_BINARY = 1024;
const REGEX_STRING = /^((?:\d+)?(?:\.\d+))\s*([a-zA-Z]{2,3})$/; // TODO: Parse spaces, dots and commas?

/**
 * Parses the string and returns the number of bytes encoded with the string.
 * @param s String to parse. Should be in format "<number> <unit>". Case-insensetive.
 * @returns Parsed number of bytes. If the number is greater than {@link Number.MAX_SAFE_INTEGER}, then `bigint` will be
 *          returned, number otherwise.
 * @throws {@link SyntaxError} If the string format is invalid.
 * @example
 * ```ts
 * bytes("10KB");  // 10000
 * bytes("1 mib"); // 1048576
 * bytes("1QiB");  // 1267650600228229401496703205376n
 * bytes("1 ds");  // throws an error
 * ```
 */
export function bytes(s: string): number | bigint {
	const parsed = s.match(REGEX_STRING);
	if (!parsed)
		throw new SyntaxError(`The string "${string.escape(s)}" is not a valid`);
	const numRaw = +parsed[1];
	const unitRaw = parsed[2];
	const unitLowercased = unitRaw.toLowerCase();
	let multiplier: number | bigint;
	let unitIndex: number;
	let unitArray: string[];
	unitIndex = UNIT_DECIMAL_LOWERCASE.indexOf(unitLowercased);
	if (unitIndex < 0) {
		unitIndex = UNIT_BINARY_LOWERCASE.indexOf(unitLowercased);
		if (unitIndex < 0)
			throw new SyntaxError(`Unknown unit "${string.escape(unitRaw)}" in string "${string.escape(s)}"`);
		unitArray = UNIT_BINARY;
		multiplier = MULTIPLIER_BINARY;
	} else {
		unitArray = UNIT_DECIMAL;
		multiplier = MULTIPLIER_DECIMAL;
	}
	let result: number | bigint = numRaw;
	for (let i = unitIndex; i !== 0; i--) {
		// @ts-ignore
		let resultTmp: number | bigint = result * multiplier;
		if (Number.MAX_SAFE_INTEGER < resultTmp && typeof result !== "bigint") {
			// @ts-ignore
			resultTmp = BigInt(result * multiplier);
			multiplier = BigInt(multiplier);
		}
		result = resultTmp;
	}
	return result;
}

export function format(format: string, bytes: number | bigint): string {
	format; bytes;
	return "";
}
