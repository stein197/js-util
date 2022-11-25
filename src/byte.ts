import * as string from "./string";

const UNIT_DECIMAL: string[] = [
	"B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"
];
const UNIT_BINARY: string[] = [
	"B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "RiB", "QiB"
];
const UNIT_DECIMAL_LOWERCASE = UNIT_DECIMAL.map(unit => unit.toLowerCase());
const UNIT_BINARY_LOWERCASE = UNIT_BINARY.map(unit => unit.toLowerCase());
const MULTIPLIER_DECIMAL = 1000n;
const MULTIPLIER_BINARY = 1024n;
const REGEX_STRING = /^((?:\d+)?(?:\.\d+))\s*([a-zA-Z]{2,3})$/; // TODO: Parse spaces, dots and commas?
const DEFAULT_OPTIONS: Options = {
	scale: "binary",
	space: false
}

/**
 * Parses the string an returns the number of bytes encoded with string. Case-insensetive
 * @param s String to parse. Should be in format "<number> <unit>".
 * @returns Parsed number of bytes. If the number is greater than {@link Number.MAX_SAFE_INTEGER}, then `bigint` will be
 *          returned, number otherwise.
 * @throws {@link SyntaxError} If the string format is invalid.
 * @example
 * ```ts
 * parse("10KB"); // 10000
 * ```
 */
export function parse(s: string): number | bigint {
	const parsed = s.match(REGEX_STRING);
	if (!parsed)
		throw new SyntaxError(`The string "${string.escape(s)}" is not a valid`);
	const n = BigInt(parsed[1]);
	const unitRaw = parsed[2];
	const unitLowercased = unitRaw.toLowerCase();
	let multiplier: bigint;
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
	let result = n;
	for (let i = unitIndex; i !== 0; i--)
		result *= multiplier;
	return result <= Number.MAX_SAFE_INTEGER ? Number(result) : result;
}

export function stringify(bytes: number | bigint, options: Options): string {}

type Options = {
	scale: "decimal" | "binary";
	precision?: string;
	space: boolean;
}
