import * as assert from "assert";
import * as mocha from "mocha";
import * as roman from "../src/roman";

mocha.describe("parse()", () => {
	// TODO
	mocha.it("Should return correct result", () => {});
	// TODO
	mocha.it("Should return correct result when strings are lowercased", () => {});
	// TODO
	mocha.it("Should throw an error when string is empty", () => {});
	// TODO
	mocha.it("Should throw an error when string contains invalid characters", () => {});
	// TODO
	mocha.it("Should throw an error when string contains more than 3 same digits in a row", () => {});
	// TODO
	mocha.it("Should throw an error when consequent digits combinations are bigger than previous ones", () => {});
	// TODO
	mocha.it("Should throw an error when there are invalid subtraction combinations", () => {});
});
mocha.describe("stringify()", () => {
	// TODO
	mocha.it("Should return correct result", () => {});
	// TODO
	mocha.it("Should throw an error when the argument is less than 1", () => {});
	// TODO
	mocha.it("Should throw an error when the argument is greater than 3999", () => {});
	// TODO
	mocha.it("Should throw an error when the argument is not an integer", () => {});
});
// TODO
mocha.it("parse() === stringify()", () => {});