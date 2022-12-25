import "mocha";
import * as assert from "assert";
import * as file from "../src/file";

describe("file.base()", () => {
	it("Should return a base", () => {
		assert.equal(file.base("file.txt"), "file");
	});
	it("Should return a base when there are multiple dots in the filename", () => {
		assert.equal(file.base("file.ext.txt"), "file.ext");
	});
	it("Should return the same string when there is no any extension", () => {
		assert.equal(file.base("file"), "file");
	});
	it("Should return an empty string when there are no a base", () => {
		assert.equal(file.base(".txt"), "");
	});
	it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.base(""), "");
	});
});

describe("file.ext()", () => {
	it("Should return an extension", () => {
		assert.equal(file.ext("file.txt"), "txt");
	});
	it("Should return the last extension without the dot when there are multiple dots in the filename", () => {
		assert.equal(file.ext("file.ext.txt"), "txt");
	});
	it("Should return an empty string when there is no any extension", () => {
		assert.equal(file.ext("file"), "");
	});
	it("Should return an extension when where is no a base", () => {
		assert.equal(file.ext(".txt"), "txt");
	});
	it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.ext(""), "");
	});
});
