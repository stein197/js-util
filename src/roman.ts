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
const DICTIONARY = {
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

/**
 * Parses the given roman number into a plain one. Case-insensetive. Throws errors if:
 * - String is empty
 * - String contains invalid characters
 * - Characters occur more than 3 times in a row
 * - String contains invalid subtraction sequences
 * - The are sequences that are higher than the previous ones
 * @param num Roman number to parse.
 * @returns Plain parsed number.
 * @throws {SyntaxError} In case of syntax error. The cases are listed in the description above.
 * @example
 * ```ts
 * parse("XIX");       // 19
 * parse("XXXIX");     // 39
 * parse("mmmcmxcix"); // 3999
 * parse("");          // throws an error
 * ```
 */
export function parse(num: string): number {
	if (!num)
		throw new SyntaxError("Cannot parse string \"\": the string is empty");
	let result = 0;
	let curToken = "";
	let lastTokenValue = Infinity;
	for (let i = 0, char = num[i], charUppercased = char.toUpperCase(), nextChar = num[i + 1], curCharCount = 1; i < num.length; i++, char = num[i], charUppercased = char?.toUpperCase(), nextChar = num[i + 1], curCharCount = char === num[i - 1] ? curCharCount + 1 : 1) {
		const digit: number = DICTIONARY[charUppercased];
		if (!digit)
			throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: the character "${string.escape(char)}" is not valid roman digit`);
		if (MAX_CHARS < curCharCount)
			throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: the character "${char}" occurs more than ${MAX_CHARS} times in a row`);
		const nextDigit: number = DICTIONARY[nextChar?.toUpperCase()];
		const isLess = digit < nextDigit;
		if ((isLess && curToken) || !isLess) {
			const token = curToken + charUppercased;
			if (token.length === 2) {
				const [lowChar, highChar] = token;
				const lowValue: number = DICTIONARY[lowChar];
				const highValue: number = DICTIONARY[highChar];
				if (lowValue.toString()[0] === "5")
					throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: lower digit in token "${token}" cannot be a multiple of five`);
				const maxHigh = lowValue * 10;
				if (maxHigh < highValue)
					throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: higher digit in token "${token}" is too high`);
			}
			const tokenValue = getTokenValue(token);
			if (lastTokenValue < tokenValue)
				throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: token "${token}" cannot be greater than the previous one`);
			result += tokenValue;
			lastTokenValue = tokenValue;
			// yield token;
			curToken = "";
		} else {
			curToken = charUppercased;
		}
	}
	return result;
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

function getTokenValue(token: string): number {
	switch (token.length) {
		case 1:
			return DICTIONARY[token];
		case 2:
			return DICTIONARY[token[1]] - DICTIONARY[token[0]];
		default:
			throw new Error(`Invalid token ${token}`);
	}
}
