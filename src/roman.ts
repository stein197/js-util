import * as string from "./string";

/**
 * Minimum value that roman numerals can have.
 */
export const MIN_VALUE = 1;

/**
 * Maximum value that roman numerals can have.
 */
export const MAX_VALUE = 3999;
const MAX_CHARS = 3;
const DICTIONARY = { // TODO: Replace with ["I", "V", "X", "L", "C", "D", "M"]?
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000
};

// TODO: Remove, use only DICTIONARY const
const DICTIONARY_RADIX = {
	//  1       10      100    1000
	1: ["I",    "X",    "C",   "M"  ],
	2: ["II",   "XX",   "CC",  "MM" ],
	3: ["III",  "XXX",  "CCC", "MMM"],
	4: ["IV",   "XL",   "CD"        ],
	5: ["V",    "L",    "D"         ],
	6: ["VI",   "LX",   "DC"        ],
	7: ["VII",  "LXX",  "DCC"       ],
	8: ["VIII", "LXXX", "DCCC"      ],
	9: ["IX",   "XC",   "CM"        ]
};

// TODO
export function parse(num: string): number {
	num = prepare(num);
}

/**
 * Converts integers into roman numbers.
 * @param num Number to convert. Must be an integer and fall in range of [1..3999].
 * @returns Number in roman notation.
 * @throws {Error} If the number is not an integer or does not fall in range of [1..3999].
 * @example
 * ```ts
 * stringify(12); // "XII"
 * stringify(19); // "XIX"
 * stringify(21); // "XXI"
 * ```
 */
export function stringify(num: number): string {
	if (!Number.isInteger(num))
		throw new Error(`Cannot convert ${num} to a roman number: only integers are allowed`);
	if (num < MIN_VALUE || MAX_VALUE < num)
		throw new Error(`Cannot convert ${num} to a roman number: only integers within range of [${MIN_VALUE}..${MAX_VALUE}] are allowed`);
	let result = "";
	let radix = 1000;
	while (radix >= 1) {
		let radixAmount = 0;
		while (num >= radix) {
			num -= radix;
			radixAmount++;
		}
		if (radixAmount) {
			let radixIndex = 0;
			let tmpRadix = radix;
			while (tmpRadix >= 1) {
				tmpRadix /= 10;
				radixIndex++;
			}
			result += DICTIONARY_RADIX[radixAmount][radixIndex - 1];
		}
		radix /= 10;
	}
	return result;
}

/**
 * Performs tokenization on roman number. Token is a sequence of characters (1 or 2) that can represent single number.
 * The function tokenizes the string regardless of its validity, so it's possible to pass incorrect roman number.
 * @param num String to tokenize.
 * @returns Array of tokens
 * @throws {SyntaxError} If the string contains invalid characters that are not allowed for roman numbers.
 * @example
 * ```ts
 * [...tokenize("XIX")]; // ["X", "IX"]
 * [...tokenize("XXIC")]; // ["X", "X", "IC"] despite that the string is invalid
 * ```
 */
export function* tokenize(num: string): Generator<string> {
	let curToken = "";
	for (let i = 0, char = num[i], charUppercased = char.toUpperCase(), nextChar = num[i + 1], curCharCount = 1; i < num.length; i++, char = num[i], charUppercased = char?.toUpperCase(), nextChar = num[i + 1], curCharCount = char === num[i - 1] ? curCharCount + 1 : 1) {
		const digit: number = DICTIONARY[charUppercased];
		if (!digit)
			throw new SyntaxError(`Cannot parse string "${string.escape(num)}": the character "${string.escape(char)}" at ${i} is not valid roman digit`);
		const nextDigit: number = DICTIONARY[nextChar?.toUpperCase()];
		const isLess = digit < nextDigit;
		if ((isLess && curToken) || !isLess) {
			yield curToken + charUppercased;
			curToken = "";
		} else {
			curToken = charUppercased;
		}
	}
}

/**
 * Checks if the string is valid roman number.
 * @param num Number to validate.
 * @returns `true` if the string is valid roman number, `false` otherwise.
 */
export function valid(num: string): boolean {
	try {
		parse(num);
		return true;
	} catch {
		return false;
	}
}
