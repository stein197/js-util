// TODO: https://semver.org/
const REGEX_SEMVER = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<!\.)(?<prerelease>[\.\-A-Za-z0-9]+)(?!=\.))?(?:\+(?<!\.)(?<build>[\.\-A-Za-z0-9]+)(?!=\.))?$/;

// TODO
export function compare(v1: string, v2: string): -1 | 0 | 1 {}

// TODO
export function next(v: string, power: "major" | "minor" | "patch" | "prerelease" | "build"): string {}

/**
 * Parses the given semver string into object.
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

// TODO
export function stringify(v: Version): string {}

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
