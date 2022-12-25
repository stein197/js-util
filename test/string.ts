import "mocha";
import * as assert from "assert";
import * as string from "../src/string";

describe("escape()", () => {
	it("Should return empty string when escaping empty one", () => {
		assert.equal(string.escape(""), "");
	});
	it("Should return the same string when escaping string without special characters", () => {
		assert.equal(string.escape("abc"), "abc");
	});
	it("Should return correct string when escaping string with special characters", () => {
		assert.equal(string.escape("ab\"c"), "ab\\\"c");
	});
	it("Should return correct string when double escaping", () => {
		assert.equal(string.escape(string.escape("ab\"c")), "ab\\\\\\\"c");
	});
});

describe("unescape()", () => {
	it("Should return empty string when unescaping empty one", () => {
		assert.equal(string.unescape(""), "");
	});
	it("Should return the same string when unescaping string without escaped characters", () => {
		assert.equal(string.unescape("abc"), "abc");
	});
	it("Should return correct string when unescaping string with escaped characters", () => {
		assert.equal(string.unescape("ab\\\"c"), "ab\"c");
	});
	it("Should return correct string when double unescaping", () => {
		assert.equal(string.unescape(string.unescape("ab\\\\\\\"c")), "ab\"c");
	});
});

describe("format()", () => {
	it("Should return empty string when formatting the empty one", () => {
		assert.equal(string.format(""), "");
	});
	it("Should return the same string when formatting the string without placeholders", () => {
		assert.equal(string.format("abc"), "abc");
	});
	it("Should insert braces as is when they are escaped", () => {
		assert.equal(string.format("abc{{}}"), "abc{}");
	});
	it("Should return the original string when an opening brace does not have the corresponding closing one", () => {
		assert.equal(string.format("abc{0"), "abc{0");
	});
	it("Should return the original string when a closing brace does not have the corresponding opening one", () => {
		assert.equal(string.format("ab}c"), "ab}c");
	});
	it("Should insert empty string when there is no argument with specified index", () => {
		assert.equal(string.format("a {10} c"), "a  c");
	});
	it("Should return the original string when placeholders are empty", () => {
		assert.equal(string.format("ab{}c"), "ab{}c");
	});
	it("Should return the original string when placeholders are invalid", () => {
		assert.equal(string.format("ab{1c}"), "ab{1c}");
	});
	it("Should return correct string when placeholder is enclosed in double braces", () => {
		assert.equal(string.format("{{{0}}}", "String"), "{String}");
	});
	it("Should return correct string when replacement contains curly braces", () => {
		assert.equal(string.format("{0}", "{{}}"), "{{}}")
	});
	it("Should return correct string", () => {
		assert.equal(string.format("a {0} c {1}", "b", "d"), "a b c d");
	});
});
