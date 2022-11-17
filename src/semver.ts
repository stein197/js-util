import * as string from "./string";

// TODO: https://semver.org/
const REGEX_SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-(?<!\.)([\-A-Za-z0-9]+(?:\.[\.\-A-Za-z0-9]+)*)(?!=\.))?(?:\+(?<!\.)([A-Za-z0-9]+(?:\.[\-A-Za-z0-9]+)*)(?!=\.))?$/;
const MSG_INVALID = "\"{0}\" is not a valid semver string";

// TODO
export function compare(v1: string, v2: string): -1 | 0 | 1 {}

// TODO
export function next(v: string, power: "major" | "minor" | "patch" | "prerelease" | "build"): string {}

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
 * stringify({major: 3, minor: 2, patch: 1}); // "3.2.1"
 * ```
 */
export function stringify(v: Version): string {
	return `${v[0]}.${v[1]}.${v[2]}${v[3] ? `-${v[3]}` : ""}${v[4] ? `+${v[4]}` : ""}`;
}

type Version = [major: number, minor: number, patch: number, prerelease?: string, build?: string];
