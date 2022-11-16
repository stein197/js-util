// TODO: https://semver.org/
const REGEX_SEMVER = /^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?:-(?<!\.)(?<prerelease>[\.\-A-Za-z0-9]+)(?!=\.))?(?:\+(?<!\.)(?<build>[\.\-A-Za-z0-9]+)(?!=\.))?$/;

// TODO
export function compare(v1: string, v2: string): -1 | 0 | 1 {}

// TODO
export function next(v: string, power: "major" | "minor" | "patch" | "pre-release" | "build"): string {}

// TODO
export function valid(v: string): boolean {}

// TODO
export function parse(v: string): Version {}

// TODO
export function stringify(v: Version): string {}

type Version = {
	major: number;
	minor: number;
	patch: number;
	preRelease?: string;
	build?: string;
}
