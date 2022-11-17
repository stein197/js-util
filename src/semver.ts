import * as string from "./string";

const REGEX_SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-(?<!\.)([\-A-Za-z0-9]+(?:\.[\.\-A-Za-z0-9]+)*)(?!=\.))?(?:\+(?<!\.)([\-A-Za-z0-9]+(?:\.[\-A-Za-z0-9]+)*)(?!=\.))?$/;
const MSG_INVALID = "\"{0}\" is not a valid semver string";
const MAIN_NUMS_AMOUNT = 3;

/**
 * Compares two versions, according to {@link https://semver.org/#spec-item-11 this} article.
 * @param v1 The first version to compare.
 * @param v2 The second version to compare.
 * @returns -1 if the first one is less than the second one, 1 if the first one is greater than second one, 0 if they
 *          are both equal.
 */
export function compare(v1: string, v2: string): -1 | 0 | 1 {
	const ver1 = parse(v1);
	const ver2 = parse(v2);
	for (let i = 0; i < MAIN_NUMS_AMOUNT; i++) {
		if (ver1[i]! < ver2[i]!)
			return -1;
		if (ver1[i]! > ver2[i]!)
			return 1;
	}
	const pre1 = ver1[3];
	const pre2 = ver2[3];
	if (pre1 && pre2)
		return pre1 < pre2 ? -1 : pre1 > pre2 ? 1 : 0;
	if (!pre1 && pre2)
		return 1;
	if (pre1 && !pre2)
		return -1;
	return 0;
}

/**
 * Increments the version number. If the version has pre-release or build metadata, they will be discarted.
 * @param v Version to increment.
 * @param power Which field to increment. Allowed values are: "major", "minor" and "patch"
 * @returns The next version.
 */
export function next(v: string, power: "major" | "minor" | "patch"): string {
	const [major, minor, patch] = parse(v);
	return stringify([
		power === "major" ? major + 1 : major,
		power === "major" ? 0 : power === "minor" ? minor + 1 : minor,
		power === "patch" ? patch + 1 : 0
	]);
}

/**
 * Parses the given semver string into object. It's the opposite of {@link stringify}
 * @param v String to parse.
 * @returns Parsed object.
 * @throws {@link SyntaxError} if the string is not a valid semver string.
 * @example
 * ```ts
 * const data = parse("1.2.3-45+67");
 * [1, 2, 3, "45", "67"]
 * ```
 */
export function parse(v: string): Version {
	const match = v.match(REGEX_SEMVER);
	if (!match)
		throw new SyntaxError(string.format(MSG_INVALID, string.escape(v)));
	return [
		+match[1],
		+match[2],
		+match[3],
		match[4],
		match[5]
	];
}

/**
 * Stringifies the given semver object. It's the opposite of {@link parse}.
 * @param v Object to stringify.
 * @returns Stringified version.
 * @example
 * ```ts
 * stringify([3, 2, 1]); // "3.2.1"
 * ```
 */
export function stringify(v: Version): string {
	return `${v[0]}.${v[1]}.${v[2]}${v[3] ? `-${v[3]}` : ""}${v[4] ? `+${v[4]}` : ""}`;
}

type Version = [major: number, minor: number, patch: number, prerelease?: string, build?: string];
