import * as string from "./string";

export const MIN_VALUE = 1;
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
	const data = toArray(num);
}

/**
 * Converts integers into roman numbers.
 * @param num Number to convert. Must be an integer and fall in range of [1..3999].
 * @returns Number in roman notation.
 * @throws {Error} If the number is not an integer or does not fall in range of [1..3999].
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

function toArray(num: string): number[] {
	if (!num.length)
		throw new SyntaxError("Cannot parse string \"\": the string is empty");
	let result = new Array(num.length);
	for (let i = 0, char = num[i], prevChar = "", ucChar = char.toUpperCase(), curCharCount = 1; i < num.length; i++, prevChar = char, char = num[i], ucChar = char.toUpperCase(), curCharCount = prevChar === char ? curCharCount + 1 : 1) {
		if (!(ucChar in DICTIONARY))
			throw new SyntaxError(`Cannot parse string "${string.escape(num)}": the character "${string.escape(char)}" at ${i} is not valid roman digit`);
		if (MAX_CHARS < curCharCount)
			throw new SyntaxError(`Cannot parse string "${string.escape(num)}": the character "${string.escape(char)}" at ${i} occurs more than ${MAX_CHARS} times in a row`);
		result[i] = DICTIONARY[ucChar];
	}
	return result;
}
