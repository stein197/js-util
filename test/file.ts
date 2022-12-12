import * as assert from "assert";
import * as mocha from "mocha";
import * as file from "../src/file";

mocha.describe("getBase()", () => {
	mocha.it("Should return a base", () => {
		assert.equal(file.getBase("file.txt"), "file");
	});
	mocha.it("Should return a base when there are multiple dots in the filename", () => {
		assert.equal(file.getBase("file.ext.txt"), "file.ext");
	});
	mocha.it("Should return the same string when there is no any extension", () => {
		assert.equal(file.getBase("file"), "file");
	});
	mocha.it("Should return an empty string when there are no a base", () => {
		assert.equal(file.getBase(".txt"), "");
	});
	mocha.it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.getBase(""), "");
	});
});

mocha.describe("getExt()", () => {
	mocha.it("Should return an extension", () => {
		assert.equal(file.getExt("file.txt"), "txt");
	});
	mocha.it("Should return the last extension without the dot when there are multiple dots in the filename", () => {
		assert.equal(file.getExt("file.ext.txt"), "txt");
	});
	mocha.it("Should return an empty string when there is no any extension", () => {
		assert.equal(file.getExt("file"), "");
	});
	mocha.it("Should return an extension when where is no a base", () => {
		assert.equal(file.getExt(".txt"), "txt");
	});
	mocha.it("Should return an empty string when the filename is empty", () => {
		assert.equal(file.getExt(""), "");
	});
});