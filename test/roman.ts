import * as assert from "assert";
import * as mocha from "mocha";
import * as roman from "../src/roman";

mocha.describe("parse()", () => {
	// TODO
	mocha.it.skip("Should return correct result", () => {});
	// TODO
	mocha.it.skip("Should return correct result when strings are lowercased", () => {});
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
	// TODO
	mocha.it.skip("Should return correct result", () => {});
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
// TODO
mocha.it("parse() === stringify()", () => {});