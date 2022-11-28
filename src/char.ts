const REGEX_LETTER = /^\p{L}$/u;
const REGEX_NUMBER = /^\p{N}$/u;
const REGEX_SPACE = /^\p{Z}$/u;
const REGEX_PUNCT = /^\p{P}$/u;

/**
 * Checks if the character is letter.
 * @param char Character to test.
 * @returns `true` if the character is letter.
 */
export function isLetter(char: string): boolean {
	return char.search(REGEX_LETTER) >= 0;
}

/**
 * Checks if the character is number.
 * @param char Character to test.
 * @returns `true` if the character is number.
 */
export function isNumber(char: string): boolean {
	return char.search(REGEX_NUMBER) >= 0;
}

/**
 * Checks if the character is space.
 * @param char Character to test.
 * @returns `true` if the character is space.
 */
export function isSpace(char: string): boolean {
	return char.search(REGEX_SPACE) >= 0;
}

/**
 * Checks if the character is punctuation.
 * @param char Character to test.
 * @returns `true` if the character is punctuation.
 */
export function isPunct(char: string): boolean {
	return char.search(REGEX_PUNCT) >= 0;
}

/**
 * Checks if the character is letter or number.
 * @param char Character to test.
 * @returns `true` if the character is letter or number.
 */
export function isAlnum(char: string): boolean {
	return isLetter(char) || isNumber(char);
}
