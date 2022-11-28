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
export function parse(num: string): number {}

// TODO
export function stringify(num: number): string {
	if (!Number.isInteger(num))
		throw new Error(`Cannot convert ${num} to a roman number: only integers allowed`);
	if (num < MIN_NUMBER || MAX_NUMBER < num)
		throw new Error(`Cannot convert ${num} to a roman number: only numbers within range of [${MIN_NUMBER};${MAX_NUMBER}] are allowed`);
}
