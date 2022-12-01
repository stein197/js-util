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
const DICTIONARY_REVERSED = Object.entries(DICTIONARY).reduce((dict, [key, value]) => {
	dict[value] = key;
	return dict;
}, {});

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
		throw new SyntaxError("Cannot parse \"\": the string is empty");
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
				if (isDigitMultipleOfFive(lowChar))
					throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: lower digit in token "${num.substring(i - 1, i + 1)}" cannot be a multiple of five`);
				const maxHigh = lowValue * 10;
				if (maxHigh < highValue)
					throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: higher digit in token "${num.substring(i - 1, i + 1)}" is too high`);
			}
			const tokenValue = getTokenValue(token);
			if (lastTokenValue < tokenValue)
				throw new SyntaxError(`Cannot parse "${string.escape(num)}" at ${i}: token "${num.substring(i - 1, i + 1)}" cannot be greater than the previous one`);
			result += tokenValue;
			lastTokenValue = tokenValue;
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
	let prevRadix = 1;
	let radix = 10;
	while (num > 0) {
		const rest = num % radix;
		num -= rest;
		if (rest <= prevRadix * 3)
			result = DICTIONARY_REVERSED[prevRadix].repeat(rest / prevRadix) + result;
		else if (rest === prevRadix * 4)
			result = DICTIONARY_REVERSED[prevRadix] + DICTIONARY_REVERSED[radix / 2] + result;
		else if (rest === prevRadix * 5)
			result = DICTIONARY_REVERSED[radix / 2] + result;
		else if (rest <= prevRadix * 8)
			result = DICTIONARY_REVERSED[radix / 2] + DICTIONARY_REVERSED[prevRadix].repeat((rest / prevRadix) % 5) + result;
		else
			result = DICTIONARY_REVERSED[prevRadix] + DICTIONARY_REVERSED[radix] + result;

		prevRadix = radix;
		radix *= 10;
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

function isDigitMultipleOfFive(digit: string): boolean {
	return digit === "V" || digit === "L" || digit === "D";
}
