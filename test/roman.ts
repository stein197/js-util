import * as assert from "assert";
import * as mocha from "mocha";
import * as roman from "../src/roman";

const CASES: [string, number][] = [
	["I", 1],
	["II", 2],
	["III", 3],
	["IV", 4],
	["V", 5],
	["VI", 6],
	["VII", 7],
	["VIII", 8],
	["IX", 9],
	["X", 10],
	["XI", 11],
	["XII", 12],
	["XIII", 13],
	["XIV", 14],
	["XV", 15],
	["XVI", 16],
	["XVII", 17],
	["XVIII", 18],
	["XIX", 19],
	["XX", 20],
	["XXI", 21],
	["XXII", 22],
	["XXIII", 23],
	["XXIV", 24],
	["XXV", 25],
	["XXVI", 26],
	["XXVII", 27],
	["XXVIII", 28],
	["XXIX", 29],
	["XXX", 30],
	["XXXI", 31],
	["XXXII", 32],
	["XXXIII", 33],
	["XXXIV", 34],
	["XXXV", 35],
	["XXXVI", 36],
	["XXXVII", 37],
	["XXXVIII", 38],
	["XXXIX", 39],
	["XL", 40],
	["XLI", 41],
	["XLII", 42],
	["XLIII", 43],
	["XLIV", 44],
	["XLV", 45],
	["XLVI", 46],
	["XLVII", 47],
	["XLVIII", 48],
	["XLIX", 49],
	["L", 50],
	["LI", 51],
	["LII", 52],
	["LIII", 53],
	["LIV", 54],
	["LV", 55],
	["LVI", 56],
	["LVII", 57],
	["LVIII", 58],
	["LIX", 59],
	["LX", 60],
	["LXI", 61],
	["LXII", 62],
	["LXIII", 63],
	["LXIV", 64],
	["LXV", 65],
	["LXVI", 66],
	["LXVII", 67],
	["LXVIII", 68],
	["LXIX", 69],
	["LXX", 70],
	["LXXI", 71],
	["LXXII", 72],
	["LXXIII", 73],
	["LXXIV", 74],
	["LXXV", 75],
	["LXXVI", 76],
	["LXXVII", 77],
	["LXXVIII", 78],
	["LXXIX", 79],
	["LXXX", 80],
	["LXXXI", 81],
	["LXXXII", 82],
	["LXXXIII", 83],
	["LXXXIV", 84],
	["LXXXV", 85],
	["LXXXVI", 86],
	["LXXXVII", 87],
	["LXXXVIII", 88],
	["LXXXIX", 89],
	["XC", 90],
	["XCI", 91],
	["XCII", 92],
	["XCIII", 93],
	["XCIV", 94],
	["XCV", 95],
	["XCVI", 96],
	["XCVII", 97],
	["XCVIII", 98],
	["XCIX", 99],
	["C", 100],
	["D", 500],
	["MMMCMXCIX", 3999]
];

mocha.describe("parse()", () => {
	mocha.it("Should return correct result", () => {
		for (const [romanNum, arabicNum] of CASES)
			assert.equal(roman.parse(romanNum), arabicNum);
	});
	mocha.it("Should return correct result when strings are lowercased", () => {
		for (const [romanNum, arabicNum] of CASES)
			assert.equal(roman.parse(romanNum.toLowerCase()), arabicNum);
	});
	mocha.it("Should throw an error when string is empty", () => {
		assert.throws(() => roman.parse(""), {message: "Cannot parse string \"\": the string is empty"});
	});
	mocha.it("Should throw an error when string contains invalid characters", () => {
		assert.throws(() => roman.parse("VIa"), {message: "Cannot parse string \"VIa\": the character \"a\" at 2 is not valid roman digit"});
	});
	mocha.it("Should throw an error when string contains more than 3 same digits in a row", () => {
		assert.throws(() => roman.parse("viiii"), {message: "Cannot parse string \"viiii\": the character \"i\" at 4 occurs more than 3 times in a row"});
	});
	// TODO
	mocha.it.skip("Should throw an error when consequent digits combinations are bigger than previous ones", () => {});
	// TODO
	mocha.it.skip("Should throw an error when there are invalid subtraction combinations", () => {});
});
mocha.describe("stringify()", () => {
	mocha.it("Should return correct result", () => {
		for (const [romanNum, arabicNum] of CASES)
			assert.equal(roman.stringify(arabicNum), romanNum);
	});
	mocha.it("Should return correct result when number is the lower bound", () => {
		assert.equal(roman.stringify(1), "I");
	});
	mocha.it("Should return correct result when number is the upper bound", () => {
		assert.equal(roman.stringify(3999), "MMMCMXCIX");
	});
	mocha.it("Should throw an error when the argument is less than 1", () => {
		assert.throws(() => roman.stringify(0), {message: "Cannot convert 0 to a roman number: only numbers within range of [1..3999] are allowed"});
	});
	mocha.it("Should throw an error when the argument is greater than 3999", () => {
		assert.throws(() => roman.stringify(4000), {message: "Cannot convert 4000 to a roman number: only numbers within range of [1..3999] are allowed"});
	});
	mocha.it("Should throw an error when the argument is not an integer", () => {
		assert.throws(() => roman.stringify(1.5), {message: "Cannot convert 1.5 to a roman number: only integers are allowed"});
	});
});
