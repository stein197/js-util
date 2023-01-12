import "mocha";
import * as assert from "assert";
import * as char from "../src/char";

const SET_LETTERS = "abcذرزسشصضطظعغ";
const SET_NUMBERS = "0123456789٠١٢٣٤٥٦٧۸٩";
const SET_SPACES = " \t\n\r";
const SET_PUNCT = "!\"#$%&'()*+,-./:;<=>?@[]^_{|}~";

describe("char.isLetter()", () => {
	it("Should return true for letters", () => {
		for (const ch of SET_LETTERS)
			assert.equal(char.isLetter(ch), true, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
	it("Should return false for other cases", () => {
		for (const ch of SET_NUMBERS)
			assert.equal(char.isLetter(ch), false, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
});

describe("char.isNumber()", () => {
	it("Should return true for numbers", () => {
		for (const ch of SET_NUMBERS)
			assert.equal(char.isNumber(ch), true, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
	it("Should return false for other cases", () => {
		for (const ch of SET_LETTERS)
			assert.equal(char.isNumber(ch), false, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
});

describe("char.isSpace()", () => {
	it("Should return true for spaces", () => {
		for (const ch of SET_SPACES)
			assert.equal(char.isSpace(ch), true, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
	it("Should return false for other cases", () => {
		for (const ch of SET_PUNCT)
			assert.equal(char.isSpace(ch), false, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
});

describe("char.isPunct()", () => {
	it("Should return true for punct", () => {
		for (const ch of SET_PUNCT)
			assert.equal(char.isPunct(ch), true, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
	it("Should return false for other cases", () => {
		for (const ch of SET_SPACES)
			assert.equal(char.isPunct(ch), false, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
});

describe("char.isAlnum()", () => {
	it("Should return true for letters and numbers", () => {
		for (const ch of [...SET_LETTERS, ...SET_NUMBERS])
			assert.equal(char.isAlnum(ch), true, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
	it("Should return false for other cases", () => {
		for (const ch of [...SET_SPACES, ...SET_PUNCT])
			assert.equal(char.isAlnum(ch), false, `Char: "${ch}"; Code: 0x${ch.codePointAt(0)!.toString(16)}`);
	});
});
