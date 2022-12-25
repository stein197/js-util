import "mocha";
import * as assert from "assert";
import * as semver from "../src/semver";

describe("compare()", () => {
	describe("Comparing main numbers without metadata", () => {
		it("Should return -1 when the major number is lesser in the first version", () => {
			assert.equal(semver.compare("1.9.9", "2.0.0"), -1);
		});
		it("Should return 1 when the major number is greater in the first version", () => {
			assert.equal(semver.compare("2.0.0", "1.9.9"), 1);
		});
		it("Should return -1 when the minor number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.9", "1.2.0"), -1);
		});
		it("Should return 1 when the minor number is greater in the first version", () => {
			assert.equal(semver.compare("1.2.0", "1.1.9"), 1);
		});
		it("Should return -1 when the patch number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.1", "1.1.2"), -1);
		});
		it("Should return 1 when the patch number is greater in the first version", () => {
			assert.equal(semver.compare("1.1.2", "1.1.1", ), 1);
		});
	});
	describe("Comparing main numbers with metadata", () => {
		it("Should return -1 when the major number is lesser in the first version", () => {
			assert.equal(semver.compare("1.9.9-100+100", "2.0.0-10+10"), -1);
		});
		it("Should return 1 when the major number is greater in the first version", () => {
			assert.equal(semver.compare("2.0.0-10+10", "1.9.9-100+100"), 1);
		});
		it("Should return -1 when the minor number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.9-100+100", "1.2.0-10+10"), -1);
		});
		it("Should return 1 when the minor number is greater in the first version", () => {
			assert.equal(semver.compare("1.2.0-10+10", "1.1.9-100+100"), 1);
		});
		it("Should return -1 when the patch number is lesser in the first version", () => {
			assert.equal(semver.compare("1.1.1-100+100", "1.1.2-10+10"), -1);
		});
		it("Should return 1 when the patch number is greater in the first version", () => {
			assert.equal(semver.compare("1.1.2-10+10", "1.1.1-100+100", ), 1);
		});
	});
	describe("Main numbers are equal but pre-release parts differ", () => {
		it("Should return -1 when the first version has pre-release metadata but the second one does not", () => {
			assert.equal(semver.compare("0.0.0-1", "0.0.0", ), -1);
		});
		it("Should return 1 when the first version does not have pre-release metadata but the second one does", () => {
			assert.equal(semver.compare("0.0.0", "0.0.0-1"), 1);
		});
		it("Should return -1 when the first pre-release metadata has less dot-separated parts than the second one", () => {
			assert.equal(semver.compare("0.0.0-0", "0.0.0-0.0"), -1);
		});
		it("Should return 1 when the first pre-release metadata has more dot-separated parts than the second one", () => {
			assert.equal(semver.compare("0.0.0-0.0", "0.0.0-0"), 1);
		});
		it("Should return -1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically lesser", () => {
			assert.equal(semver.compare("0.0.0-a.1.0", "0.0.0-a.1.1"), -1);
		});
		it("Should return 1 when both pre-release metadata has the same amount of parts but the first pre-release is lexicographically greater", () => {
			assert.equal(semver.compare("0.0.0-a.1.1", "0.0.0-a.1.0"), 1);
		});
	});
	describe("Equal versions", () => {
		it("Should return 0 when all main numbers are equal and there is no any metadata", () => {
			assert.equal(semver.compare("1.2.3", "1.2.3"), 0);
		});
		it("Should return 0 when all main numbers and prerelease are equal and there is no build metadata", () => {
			assert.equal(semver.compare("1.2.3-4", "1.2.3-4"), 0);
		});
		it("Should return 0 when all main numbers and prerelease are equal and the build metadata differs", () => {
			assert.equal(semver.compare("1.2.3-4+123", "1.2.3-4+abc"), 0);
		});
		it("Should return 0 when the strings are identical", () => {
			assert.equal(semver.compare("1.2.3-45+67", "1.2.3-45+67"), 0);
		});
	});
	describe("Parse errors", () => {
		it("Should throw an error when the first version is invalid", () => {
			assert.throws(() => semver.compare("invalid", "1.2.3"), {message: "\"invalid\" is not a valid semver string"});
		});
		it("Should throw an error when the second version is invalid", () => {
			assert.throws(() => semver.compare("1.2.3", "invalid"), {message: "\"invalid\" is not a valid semver string"});
		});
	});
});

describe("next()", () => {
	it("Should correctly increment the major number", () => {
		assert.equal(semver.next("1.2.3", "major"), "2.0.0");
	});
	it("Should correctly increment the minor number", () => {
		assert.equal(semver.next("1.2.3", "minor"), "1.3.0");
	});
	it("Should correctly increment the patch number", () => {
		assert.equal(semver.next("1.2.3", "patch"), "1.2.4");
	});
	it("Should discard any metadata when incrementing the version", () => {
		assert.equal(semver.next("0.1.0-pre-release+build", "major"), "1.0.0");
	});
});

describe("parse()", () => {
	it("Should correctly parse when the version has only main numbers", () => {
		assert.deepStrictEqual(semver.parse("1.2.3"), [1, 2, 3, undefined, undefined]);
	});
	it("Should correctly parse when the version has the main numbers and the pre-release metadata", () => {
		assert.deepStrictEqual(semver.parse("1.2.3-pre-release.data"), [1, 2, 3, "pre-release.data", undefined]);
	});
	it("Should correctly parse when the version has the main numbers and the build metadata", () => {
		assert.deepStrictEqual(semver.parse("1.2.3+build.data"), [1, 2, 3, undefined, "build.data"]);
	});
	it("Should correctly parse when the version has every possible data", () => {
		assert.deepStrictEqual(semver.parse("1.2.3-pre-release.data+build.data"), [1, 2, 3, "pre-release.data", "build.data"]);
	});
	it("Should throw an error when the version is invalid", () => {
		assert.throws(() => semver.parse("1.3"), {message: "\"1.3\" is not a valid semver string"});
	});
});

describe("stringify()", () => {
	it("Should correctly stringify when the array has only main numbers", () => {
		assert.equal(semver.stringify([1, 2, 3]), "1.2.3");
	});
	it("Should correctly stringify when the array has the main numbers and the pre-release metadata", () => {
		assert.equal(semver.stringify([1, 2, 3, "pre-release.data"]), "1.2.3-pre-release.data");
	});
	it("Should correctly stringify when the array has the main numbers and the build metadata", () => {
		assert.equal(semver.stringify([1, 2, 3, undefined, "build.data"]), "1.2.3+build.data");
	});
	it("Should correctly stringify when the array has every possible data", () => {
		assert.equal(semver.stringify([1, 2, 3, "pre-release.data", "build.data"]), "1.2.3-pre-release.data+build.data");
	});
});