import * as assert from "assert";
import * as mocha from "mocha";
import * as string from "../src/string";

mocha.describe("escape()", () => {
	mocha.it("Should return empty string when escaping empty one", () => {
		assert.equal(string.escape(""), "");
	});
	mocha.it("Should return the same string when escaping string without special characters", () => {
		assert.equal(string.escape("abc"), "abc");
	});
	mocha.it("Should return correct string when escaping string with special characters", () => {
		assert.equal(string.escape("ab\"c"), "ab\\\"c");
	});
	mocha.it("Should return correct string when double escaping", () => {
		assert.equal(string.escape(string.escape("ab\"c")), "ab\\\\\\\"c");
	});
});

mocha.describe("unescape()", () => {
	mocha.it("Should return empty string when unescaping empty one", () => {
		assert.equal(string.unescape(""), "");
	});
	mocha.it("Should return the same string when unescaping string without escaped characters", () => {
		assert.equal(string.unescape("abc"), "abc");
	});
	mocha.it("Should return correct string when unescaping string with escaped characters", () => {
		assert.equal(string.unescape("ab\\\"c"), "ab\"c");
	});
	mocha.it("Should return correct string when double unescaping", () => {
		assert.equal(string.unescape(string.unescape("ab\\\\\\\"c")), "ab\"c");
	});
});

mocha.describe("format()", () => {
	mocha.it("Should return empty string when formatting the empty one", () => {
		assert.equal(string.format(""), "");
	});
	mocha.it("Should return the same string when formatting the string without placeholders", () => {
		assert.equal(string.format("abc"), "abc");
	});
	mocha.it("Should insert braces as is when they are escaped", () => {
		assert.equal(string.format("abc\\{\\}"), "abc{}");
	});
	mocha.it("Should throw an error when an opening brace does not have the corresponding closing one", () => {
		assert.throws(() => string.format("abc{0"), {message: "Invalid format string \"abc{0\": the opening brace does not have the corresponding closing one"});
	});
	mocha.it("Should throw an error when a closing brace does not have the corresponding opening one", () => {
		assert.throws(() => string.format("ab}c"), {message: "Invalid format string \"ab}c\" at 2: the closing brace does not have the corresponding opening one"});
	});
	mocha.it("Should insert empty string when there is no argument with specified index", () => {
		assert.equal(string.format("a {10} c"), "a  c");
	});
	mocha.it("Should throw an error when placeholders are empty", () => {
		assert.throws(() => string.format("ab{}c"), {message: "Invalid format string \"ab{}c\" at 3: the placeholder is empty"});
	});
	mocha.it("Should throw an error when placeholders are invalid", () => {
		assert.throws(() => string.format("ab{1c}"), {message: "Invalid format string \"ab{1c}\" at 4: the placeholder is invalid"});
	});
	mocha.it("Should return correct string", () => {
		assert.equal(string.format("a {0} c {1}", "b", "d"), "a b c d");
	});
});
