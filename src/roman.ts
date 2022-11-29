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

// TODO
export function parse(num: string): number {
	const data = toArray(num);
}

// TODO
export function stringify(num: number): string {
	if (!Number.isInteger(num))
		throw new Error(`Cannot convert ${num} to a roman number: only integers are allowed`);
	if (num < MIN_VALUE || MAX_VALUE < num)
		throw new Error(`Cannot convert ${num} to a roman number: only numbers within range of [${MIN_VALUE}..${MAX_VALUE}] are allowed`);
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
