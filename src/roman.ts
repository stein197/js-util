import * as string from "./string";

const MAX_CHARS = 3;
const MIN_NUMBER = 1;
const MAX_NUMBER = 3999;
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
	if (num < MIN_NUMBER || MAX_NUMBER < num)
		throw new Error(`Cannot convert ${num} to a roman number: only numbers within range of [${MIN_NUMBER};${MAX_NUMBER}] are allowed`);
}

function toArray(num: string): number[] {
	let result = new Array(num.length);
	for (let i = 0, char = num[i], prevChar = "", curCharCount = 1; i < num.length; i++, prevChar = char, char = num[i], curCharCount = prevChar === char ? curCharCount + 1 : 1) {
		if (!(char in DICTIONARY))
			throw new SyntaxError(`Cannot parse string "${string.escape(num)}": the character "${string.escape(char)}" at ${i} is not valid roman digit`);
		if (MAX_CHARS < curCharCount)
			throw new SyntaxError(`Cannot parse string "${string.escape(num)}": the character "${string.escape(char)}" at ${i} occurs more than ${MAX_CHARS} times in a row`);
		result[i] = DICTIONARY[char];
	}
	return result;
}
