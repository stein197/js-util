import "mocha";
import * as assert from "assert";
import * as mime from "../src/mime";

describe("mime.is()", () => {
	it("Should return true when type is */*", () => {
		assert.equal(mime.is("*/*", "text/plain"), true);
	});
	it("Should return true when type is <type>/*", () => {
		assert.equal(mime.is("text/*", "text/plain"), true);
	});
	it("Should return true when type matches mime exactly", () => {
		assert.equal(mime.is("text/plain", "text/plain"), true);
	});
	it("Should return false when type or mime is invalid", () => {
		assert.equal(mime.is("string", "string"), false);
	});
	it("Should return false when type does not match mime", () => {
		assert.equal(mime.is("text/plain", "application/json"), false);
		assert.equal(mime.is("text/*", "application/json"), false);
	});
});
