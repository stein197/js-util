import * as assert from "assert";
import * as mocha from "mocha";
import * as semver from "../src/semver";

mocha.describe("compare()", () => {
	mocha.describe("Comparing main numbers without metadata", () => {
		mocha.it.skip("Should return -1 major number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 major number is greater in the first version", () => {});
		mocha.it.skip("Should return -1 minor number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 minor number is greater in the first version", () => {});
		mocha.it.skip("Should return -1 patch number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 patch number is greater in the first version", () => {});
	});
	mocha.describe("Comparing main numbers with metadata", () => {
		mocha.it.skip("Should return -1 major number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 major number is greater in the first version", () => {});
		mocha.it.skip("Should return -1 minor number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 minor number is greater in the first version", () => {});
		mocha.it.skip("Should return -1 patch number is lesser in the first version", () => {});
		mocha.it.skip("Should return 1 patch number is greater in the first version", () => {});
	});
	mocha.describe("Main numbers are equal but pre-release parts differ", () => {
		mocha.it.skip("Should return -1 when the first version has pre-release metadata but the second one does not", () => {});
		mocha.it.skip("Should return 1 when the first version does not have pre-release metadata but the second one does", () => {});
		mocha.it.skip("Should return -1 when the first pre-release metadata has more dot-separated parts than the second one", () => {});
		mocha.it.skip("Should return 1 when the first pre-release metadata has less dot-separated parts than the second one", () => {});
		mocha.it.skip("Should return -1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically lesser", () => {});
		mocha.it.skip("Should return 1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically greater", () => {});
	});
	mocha.describe("Equal versions", () => {
		mocha.it.skip("Should return 0 when all main numbers are equal and there is no any metadata", () => {});
		mocha.it.skip("Should return 0 when all main numbers and prerelease are equal and there is no build metadata", () => {});
		mocha.it.skip("Should return 0 when all main numbers and prerelease are equal and the build metadata differs", () => {});
		mocha.it.skip("Should return 0 when the strings are identical", () => {});
	});
	mocha.describe("Parse errors", () => {
		mocha.it.skip("Should throw an error when the first version is invalid", () => {});
		mocha.it.skip("Should throw an error when the second version is invalid", () => {});
	});
});

mocha.describe("next()", () => {
	mocha.it.skip("Should correctly increment the major number", () => {});
	mocha.it.skip("Should correctly increment the minor number", () => {});
	mocha.it.skip("Should correctly increment the patch number", () => {});
	mocha.it.skip("Should discard any metadata when incrementing the version", () => {});
});

mocha.describe("parse()", () => {
	mocha.it.skip("Should correctly parse when the version has only main numbers", () => {});
	mocha.it.skip("Should correctly parse when the version has the main numbers and the pre-release metadata", () => {});
	mocha.it.skip("Should correctly parse when the version has the main numbers and the build metadata", () => {});
	mocha.it.skip("Should correctly parse when the version has every possible data", () => {});
	mocha.it.skip("Should throw an error when the version is invalid", () => {});
});

mocha.describe("stringify()", () => {
	mocha.it.skip("Should correctly stringify when the array has only main numbers", () => {});
	mocha.it.skip("Should correctly stringify when the array has the main numbers and the pre-release metadata", () => {});
	mocha.it.skip("Should correctly stringify when the array has the main numbers and the build metadata", () => {});
	mocha.it.skip("Should correctly stringify when the array has every possible data", () => {});
});