import * as assert from "assert";
import * as mocha from "mocha";
import * as semver from "../src/semver";

mocha.describe("compare()", () => {
	mocha.describe("Comparing main numbers without metadata", () => {
		mocha.it("Should return -1 when the major number is lesser in the first version", () => {
			assert.equal(semver.compare("1.9.9", "2.0.0"), -1);
		});
		mocha.it("Should return 1 when the major number is greater in the first version", () => {
			assert.equal(semver.compare("2.0.0", "1.9.9"), 1);
		});
		mocha.it("Should return -1 when the minor number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.9", "1.2.0"), -1);
		});
		mocha.it("Should return 1 when the minor number is greater in the first version", () => {
			assert.equal(semver.compare("1.2.0", "1.1.9"), 1);
		});
		mocha.it("Should return -1 when the patch number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.1", "1.1.2"), -1);
		});
		mocha.it("Should return 1 when the patch number is greater in the first version", () => {
			assert.equal(semver.compare("1.1.2", "1.1.1", ), 1);
		});
	});
	mocha.describe("Comparing main numbers with metadata", () => {
		mocha.it("Should return -1 when the major number is lesser in the first version", () => {
			assert.equal(semver.compare("1.9.9-100+100", "2.0.0-10+10"), -1);
		});
		mocha.it("Should return 1 when the major number is greater in the first version", () => {
			assert.equal(semver.compare("2.0.0-10+10", "1.9.9-100+100"), 1);
		});
		mocha.it("Should return -1 when the minor number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.9-100+100", "1.2.0-10+10"), -1);
		});
		mocha.it("Should return 1 when the minor number is greater in the first version", () => {
			assert.equal(semver.compare("1.2.0-10+10", "1.1.9-100+100"), 1);
		});
		mocha.it("Should return -1 when the patch number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.1-100+100", "1.1.2-10+10"), -1);
		});
		mocha.it("Should return 1 when the patch number is greater in the first version", () => {
			assert.equal(semver.compare("1.1.2-10+10", "1.1.1-100+100", ), 1);
		});
	});
	mocha.describe("Main numbers are equal but pre-release parts differ", () => {
		mocha.it("Should return -1 when the first version has pre-release metadata but the second one does not", () => {
			assert.equal(semver.compare("0.0.0-1", "0.0.0", ), -1);
		});
		mocha.it("Should return 1 when the first version does not have pre-release metadata but the second one does", () => {
			assert.equal(semver.compare("0.0.0", "0.0.0-1"), 1);
		});
		mocha.it("Should return -1 when the first pre-release metadata has less dot-separated parts than the second one", () => {
			assert.equal(semver.compare("0.0.0-0", "0.0.0-0.0"), -1);
		});
		mocha.it("Should return 1 when the first pre-release metadata has more dot-separated parts than the second one", () => {
			assert.equal(semver.compare("0.0.0-0.0", "0.0.0-0"), 1);
		});
		mocha.it("Should return -1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically lesser", () => {
			assert.equal(semver.compare("0.0.0-a.1.0", "0.0.0-a.1.1"), -1);
		});
		mocha.it("Should return 1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically greater", () => {
			assert.equal(semver.compare("0.0.0-a.1.1", "0.0.0-a.1.0"), 1);
		});
	});
	mocha.describe("Equal versions", () => {
		mocha.it("Should return 0 when all main numbers are equal and there is no any metadata", () => {
			assert.equal(semver.compare("1.2.3", "1.2.3"), 0);
		});
		mocha.it("Should return 0 when all main numbers and prerelease are equal and there is no build metadata", () => {
			assert.equal(semver.compare("1.2.3-4", "1.2.3-4"), 0);
		});
		mocha.it("Should return 0 when all main numbers and prerelease are equal and the build metadata differs", () => {
			assert.equal(semver.compare("1.2.3-4+123", "1.2.3-4+abc"), 0);
		});
		mocha.it("Should return 0 when the strings are identical", () => {
			assert.equal(semver.compare("1.2.3-45+67", "1.2.3-45+67"), 0);
		});
	});
	mocha.describe("Parse errors", () => {
		mocha.it("Should throw an error when the first version is invalid", () => {
			assert.throws(() => semver.compare("invalid", "1.2.3"), {message: "\"invalid\" is not a valid semver string"});
		});
		mocha.it("Should throw an error when the second version is invalid", () => {
			assert.throws(() => semver.compare("1.2.3", "invalid"), {message: "\"invalid\" is not a valid semver string"});
		});
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