import "mocha";
import * as assert from "assert";
import * as file from "../src/file";

describe("file.getBase()", () => {
	it("Should return a base", () => {
		assert.equal(file.getBase("file.txt"), "file");
	});
	it("Should return a base when there are multiple dots in the filename", () => {
		assert.equal(file.getBase("file.ext.txt"), "file.ext");
	});
	it("Should return the same string when there is no any extension", () => {
		assert.equal(file.getBase("file"), "file");
	});
	it("Should return an empty string when there are no a base", () => {
		assert.equal(file.getBase(".txt"), "");
	});
	it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.getBase(""), "");
	});
});

describe("file.getExt()", () => {
	it("Should return an extension", () => {
		assert.equal(file.getExt("file.txt"), "txt");
	});
	it("Should return the last extension without the dot when there are multiple dots in the filename", () => {
		assert.equal(file.getExt("file.ext.txt"), "txt");
	});
	it("Should return an empty string when there is no any extension", () => {
		assert.equal(file.getExt("file"), "");
	});
	it("Should return an extension when where is no a base", () => {
		assert.equal(file.getExt(".txt"), "txt");
	});
	it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.getExt(""), "");
	});
});
