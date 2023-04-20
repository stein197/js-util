const MS = 1;
const MS_SECOND = MS * 1000;
const MS_MINUTE = MS_SECOND * 60;
const MS_HOUR = MS_MINUTE * 60;
const MS_DAY = MS_HOUR * 24;
const MS_WEEK = MS_DAY * 7;
const MS_MONTH = MS_DAY * 30;
const MS_YEAR = MS_DAY * 365;

const MS_NAMES = {
	ms: MS,
	millisecond: MS,
	milliseconds: MS,
	s: MS_SECOND,
	sec: MS_SECOND,
	secs: MS_SECOND,
	second: MS_SECOND,
	seconds: MS_SECOND,
	m: MS_MINUTE,
	min: MS_MINUTE,
	mins: MS_MINUTE,
	minute: MS_MINUTE,
	minutes: MS_MINUTE,
	h: MS_HOUR,
	hr: MS_HOUR,
	hrs: MS_HOUR,
	hour: MS_HOUR,
	hours: MS_HOUR,
	d: MS_DAY,
	day: MS_DAY,
	days: MS_DAY,
	w: MS_WEEK,
	wk: MS_WEEK,
	wks: MS_WEEK,
	week: MS_WEEK,
	weeks: MS_WEEK,
	mon: MS_MONTH,
	month: MS_MONTH,
	months: MS_MONTH,
	y: MS_YEAR,
	yr: MS_YEAR,
	yrs: MS_YEAR,
	year: MS_YEAR,
	years: MS_YEAR
};

const REGEX_MS = new RegExp(`(\\d+)(${(Object.keys(MS_NAMES)).join("|")})(?=\\b|\\d)`, "g");
const REGEX_SPACE = /\s+/g;

/**
 * Parses the given string into milliseconds. Refer to {@link MS_NAMES} to see all available names. Note that months and
 * years equal to 30 and 365 days respectively despite that these two values are variable throughout time.
 * @param time String to parse.
 * @returns Time in milliseconds or -1 if the string cannot be parsed, the same unit occurs more than once or unit
 *          values are unordered.
 * @example
 * ```ts
 * ms("1w 10mins"); // 605400000
 * ms(""); // -1
 * ```
 */
export function ms(time: string): number {
	time = time.toLowerCase().replace(REGEX_SPACE, "");
	let prevUnit = -1;
	let result = 0;
	let matchAllLength = 0;
	for (const match of time.matchAll(REGEX_MS)) {
		const [fullMatch, value, name] = match;
		const msUnit = MS_NAMES[name];
		matchAllLength += fullMatch.length;
		if (prevUnit >= 0 && prevUnit <= msUnit)
			return -1;
		prevUnit = msUnit;
		result += msUnit * +value;
	}
	return !time || matchAllLength !== time.length ? -1 : result;
}

/**
 * Parses the given string into seconds. Refer to {@link MS_NAMES} to see all available names. Note that months and
 * years equal to 30 and 365 days respectively despite that these two values are variable throughout time.
 * @param time String to parse.
 * @returns Time in seconds or -1 if the string cannot be parsed, the same unit occurs more than once or unit
 *          values are unordered.
 * @example
 * ```ts
 * s("1w 10mins"); // 605400
 * s(""); // -1
 * ```
 */
export function s(time: string): number {
	const result = ms(time);
	return result < 0 ? result : result / MS_SECOND;
}