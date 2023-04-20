import "mocha";
import * as assert from "assert";
import * as string from "../src/string";

describe("string.escape()", () => {
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

describe("string.unescape()", () => {
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

describe("string.format()", () => {
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

describe("string.toBoolean()", () => {
	it("Should return true when string is \"1\"", () => assert.equal(string.toBoolean("1"), true));
	it("Should return true when string is \"tRue\"", () => assert.equal(string.toBoolean("true"), true));
	it("Should return true when string is \"yeS\"", () => assert.equal(string.toBoolean("yes"), true));
	it("Should return true when string is \"on\"", () => assert.equal(string.toBoolean("on"), true));
	it("Should return true when string is \"y\"", () => assert.equal(string.toBoolean("y"), true));
	it("Should return false when string is \"0\"", () => assert.equal(string.toBoolean("0"), false));
	it("Should return false when string is \"faLse\"", () => assert.equal(string.toBoolean("false"), false));
	it("Should return false when string is \"no\"", () => assert.equal(string.toBoolean("no"), false));
	it("Should return false when string is \"off\"", () => assert.equal(string.toBoolean("off"), false));
	it("Should return false when string is \"n\"", () => assert.equal(string.toBoolean("n"), false));
	it("Should return null when string is empty", () => assert.equal(string.toBoolean(""), null));
	it("Should return null when string is arbitrary", () => assert.equal(string.toBoolean("string"), null));
});

describe("string.ensureStart()", () => {
	it("Ensuring empty string returns prefix", () => {
		assert.equal(string.ensureStart("", "/"), "/");
		assert.equal(string.ensureStart("", "path/"), "path/");
	});
	it("Ensuring with empty string returns the string", () => {
		assert.equal(string.ensureStart("a", ""), "a");
		assert.equal(string.ensureStart("abc", ""), "abc");
	});
	it("Ensuring with single char", () => {
		assert.equal(string.ensureStart("a", "/"), "/a");
		assert.equal(string.ensureStart("/a", "/"), "/a");
		assert.equal(string.ensureStart("abc", "/"), "/abc");
		assert.equal(string.ensureStart("/abc", "/"), "/abc");
	});
	it("Ensuring with string", () => {
		assert.equal(string.ensureStart("def", "abc"), "abcdef");
		assert.equal(string.ensureStart("cdef", "abc"), "abcdef");
		assert.equal(string.ensureStart("abcdef", "abc"), "abcdef");
	});
	it("Ensuring with prefix larger than the string returns prefix", () => {
		assert.equal(string.ensureStart("c", "bc"), "bc");
		assert.equal(string.ensureStart("def", "abcdef"), "abcdef");
	});
	it("Ensuring with prefix larger than the string and partially matches the string", () => {
		assert.equal(string.ensureStart("defghi", "abcdefg"), "abcdefghi");
	});
	it("Ensuring with prefix larger than the string and does not match the string", () => {
		assert.equal(string.ensureStart("abc", "defghi"), "defghiabc");
	});
});

describe("string.ensureEnd()", () => {
	it("Ensuring empty string returns suffix", () => {
		assert.equal(string.ensureEnd("", "/"), "/");
		assert.equal(string.ensureEnd("", "path/"), "path/");
	});
	it("Ensuring with empty string returns the string", () => {
		assert.equal(string.ensureEnd("a", ""), "a");
		assert.equal(string.ensureEnd("abc", ""), "abc");
	});
	it("Ensuring with single char", () => {
		assert.equal(string.ensureEnd("a", "/"), "a/");
		assert.equal(string.ensureEnd("a/", "/"), "a/");
		assert.equal(string.ensureEnd("abc", "/"), "abc/");
		assert.equal(string.ensureEnd("abc/", "/"), "abc/");
	});
	it("Ensuring with string", () => {
		assert.equal(string.ensureEnd("abc", "def"), "abcdef");
		assert.equal(string.ensureEnd("abcdef", "def"), "abcdef");
	});
	it("Ensuring with suffix larger than the string returns suffix", () => {
		assert.equal(string.ensureEnd("a", "abc"), "abc");
		assert.equal(string.ensureEnd("abc", "abcdef"), "abcdef");
	});
	it("Ensuring with suffix larger than the string and partially matches the string", () => {
		assert.equal(string.ensureEnd("abcdef", "cdefghi"), "abcdefghi");
	});
	it("Ensuring with suffix larger than the string and does not match the string", () => {
		assert.equal(string.ensureEnd("abc", "defghi"), "abcdefghi");
	});
});

describe("string.truncate()", () => {
	it("Truncating empty string always returns empty one", () => {
		assert.equal(string.truncate("", 1), "");
		assert.equal(string.truncate("", 0), "");
		assert.equal(string.truncate("", -1), "");
		assert.equal(string.truncate("", 1, ""), "");
		assert.equal(string.truncate("", 0, ""), "");
		assert.equal(string.truncate("", -1, ""), "");
		assert.equal(string.truncate("", 1, "..."), "");
		assert.equal(string.truncate("", 0, "..."), "");
		assert.equal(string.truncate("", -1, "..."), "");
	});
	it("Truncating single character always returns either character itself or an empty one", () => {
		assert.equal(string.truncate("a", 1), "a");
		assert.equal(string.truncate("a", 0), "");
		assert.equal(string.truncate("a", -1), "a");
		assert.equal(string.truncate("a", 1, ""), "a");
		assert.equal(string.truncate("a", 0, ""), "");
		assert.equal(string.truncate("a", -1, ""), "a");
		assert.equal(string.truncate("a", 1, "b"), "a");
		assert.equal(string.truncate("a", 0, "b"), "");
		assert.equal(string.truncate("a", -1, "b"), "a");
		assert.equal(string.truncate("a", 1, "..."), "a");
		assert.equal(string.truncate("a", 0, "..."), "");
		assert.equal(string.truncate("a", -1, "..."), "a");
	});
	it("Default", () => {
		assert.equal(string.truncate("abcdef", 3), "abc");
	});
	it("Truncating the string to it's length returns the string itself", () => {
		assert.equal(string.truncate("abcdef", 6), "abcdef");
	});
	it("Truncating the string to it's length with prefix", () => {
		assert.equal(string.truncate("abcdef", 6, "..."), "abc...");
	});
	it("Truncating the string to large length returns the string itself", () => {
		assert.equal(string.truncate("abcdef", 100), "abcdef");
	});
	it("Truncating the string to large length with prefix returns the string itself", () => {
		assert.equal(string.truncate("abcdef", 100, "..."), "abcdef");
	});
	it("Truncating the string to a total length with prefix returns the string itself", () => {
		assert.equal(string.truncate("abcdef", 9, "..."), "abcdef");
	});
});

describe("string.isEmpty()", () => {
	it("Should return true when the string is empty", () => {
		assert.equal(string.isEmpty(""), true);
	});
	it("Should return false when the string is isn't empty", () => {
		assert.equal(string.isEmpty("string"), false);
	});
});

describe("string.isBlank()", () => {
	it("Should return true when the string is empty", () => {
		assert.equal(string.isBlank(""), true);
	});
	it("Should return true when the string is blank", () => {
		assert.equal(string.isBlank(" \t\n"), true);
	});
	it("Should return false when the string isn't blank", () => {
		assert.equal(string.isBlank("string"), false);
	});
});
