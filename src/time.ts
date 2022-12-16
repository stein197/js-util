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

const MS_REGEX_ARRAY = (Object.keys(MS_NAMES)).sort((a, b) => b.length - a.length).map(name => new RegExp(`(\\d+)\\s*(${name})`));

/**
 * Parses the given string into milliseconds. Refer to {@link MS_NAMES} to see all available names. Note that months and
 * years equal to 30 and 365 days respectively despite that these two values are variable throughout time.
 * @param time String to parse.
 * @returns Time in milliseconds or -1 if the string cannot be parsed.
 * @example
 * ```ts
 * ms("1w 10mins"); // 605400000
 * ms(""); // -1
 * ```
 */
export function ms(time: string): number {
	let tmpTime = time.toLowerCase().trim();
	let result = 0;
	for (let i = 0, regex = MS_REGEX_ARRAY[i]; i < MS_REGEX_ARRAY.length && tmpTime; i++, regex = MS_REGEX_ARRAY[i]) {
		const match = tmpTime.match(regex);
		if (!match)
			continue;
		const [fullMatch, value, name] = match;
		result += MS_NAMES[name] * +value;
		tmpTime = tmpTime.replace(fullMatch, "").trim();
	}
	return !time || tmpTime ? -1 : result;
}