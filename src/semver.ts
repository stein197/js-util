// TODO: https://semver.org/
const REGEX_SEMVER = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<!\.)(?<prerelease>[\.\-A-Za-z0-9]+)(?!=\.))?(?:\+(?<!\.)(?<build>[\.\-A-Za-z0-9]+)(?!=\.))?$/;

// TODO
export function compare(v1: string, v2: string): -1 | 0 | 1 {}

// TODO
export function next(v: string, power: "major" | "minor" | "patch" | "prerelease" | "build"): string {}

/**
 * Parses the given semver string into object. It's the opposite of {@link stringify}
 * @param v String to parse.
 * @returns Parsed object or `null` if the string is not a correct semver.
 * @example
 * ```ts
 * const data = parse("1.2.3-45+67");
 * {
 * 	major: 1,
 * 	minor: 2,
 * 	patch: 3,
 * 	prerelease: "45",
 * 	build: "67"
 * }
 * ```
 */
export function parse(v: string): Version | null {
	const match = v.match(REGEX_SEMVER);
	if (!match || !match.groups)
		return null;
	const result = match.groups as unknown as Version;
	if (result.prerelease && !isMetadataValid(result.prerelease) || result.build && !isMetadataValid(result.build))
		return null;
	result.major = +result.major;
	result.minor = +result.minor;
	result.patch = +result.patch;
	return result;
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
	return `${v.major}.${v.minor}.${v.patch}${v.prerelease ? `-${v.prerelease}` : ""}${v.build ? `+${v.build}` : ""}`;
}

function isMetadataValid(data: string): boolean {
	return data.split(".").every(s => s);
}

type Version = {
	major: number;
	minor: number;
	patch: number;
	prerelease?: string;
	build?: string;
}
