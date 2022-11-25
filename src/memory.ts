import * as string from "./string";

const UNIT_DECIMAL = [
	"kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"
];
const UNIT_BINARY = [
	"KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "RiB", "QiB"
];
const MULTIPLIER_DECIMAL = 1000;
const MULTIPLIER_BINARY = 1024;
const REGEX_STRING = /^((?:\d+)?(?:\.\d+))\s*([a-zA-Z]+)$/; // TODO: Parse spaces, dots and commas?

export function parse(s: string): number {}

export function stringify(bytes: number | bigint, options: Options): string {}

export function info(data: number | bigint | string): Info {}

type Options = {
	binary: boolean;
	precision: string;
	space: boolean;
}

type Info = [number: number, unit: string];
