# CHANGELOG

## [Unreleased]

## [2.0.0](../../compare/2.0.0..1.26.0) - 2023-07-11
### Changed
- `util.track()` function signature. Now it returns plain function with `data` property instead of `calls`

## [1.26.0](../../compare/1.25.0..1.26.0) - 2023-04-30
### Added
- New functions:
	- `array.get()`
	- `array.set()`
	- `array.first()`
	- `array.last()`
	- `html.getInputValue()`
	- `html.getTable()`
	- `html.getTableRow()`
	- `html.getTableCol()`
	- `time.s()`
	- `time.m()`
	- `time.h()`
	- `time.d()`
	- `string.ensureStart()`
	- `string.ensureEnd()`
	- `string.truncate()`
	- `string.isEmpty()`
	- `string.isBlank()`

### Changed
- Renamed:
	- `array.sparse() -> array.isSparse()`
	- `array.uniq() -> array.unique()`

## [1.25.0](../../compare/1.24.0..1.25.0) - 2023-04-18
### Added
- `object.isPlain()` and `util.track()` functions

## [1.24.0](../../compare/1.23.0..1.24.0) - 2023-04-03
### Added
- `array.shuffle()`, `array.chunk()` and `array.sparse()` functions
- Support for dates, bigints and regexes for `object.equal()` function

### Removed
- `roman` module was moved to [stein197/js-roman](https://github.com/stein197/js-roman) repository

## [1.23.0](../../compare/1.22.0..1.23.0) - 2023-02-16
### Added
- `array.random()` function

### Changed
- Overloaded `util.random()`. The function can also accept only upper bound

## [1.22.0](../../compare/1.21.0..1.22.0) - 2023-02-16
### Added
- `string.toBoolean()` function

## [1.21.0](../../compare/1.20.0..1.21.0) - 2023-02-06
### Added
- `mime` module with function `is()`

### Fixed
- `time.ms()` is more strict about string it can accept

## [1.20.0](../../compare/1.19.0..1.20.0) - 2023-01-17
### Added
- `json.valid()` function

## [1.19.0](../../compare/1.18.0..1.19.0) - 2023-01-17
### Added
- `json` module with functions: `isArray()`, `isObject()` and `isEmpty()`

## [1.18.0](../../compare/1.17.0..1.18.0) - 2023-01-16
### Added
- `object.deepMerge()` accepts `array` parameter

## [1.17.0](../../compare/1.16.0..1.17.0) - 2023-01-12
### Added
- `random()` function to `util` module

## [1.16.0](../../compare/1.15.0..1.16.0) - 2023-01-12
### Added
- `char` module with functions: `isLetter`, `isNumber`, `isSpace`, `isPunct`, `isAlnum`

## [1.15.0](../../compare/1.14.0..1.15.0) - 2023-01-11
### Added
- `intersects()` function to `html` modile.

## [1.14.0](../../compare/1.13.0..1.14.0) - 2023-01-11
### Added
- `selector()` function to `html` module.

## [1.13.0](../../compare/1.12.0..1.13.0) - 2022-12-29
### Added
- `sleep()` function.

## [1.12.0](../../compare/1.11.0..1.12.0) - 2022-12-25
### Added
- Functions: `object.deepMerge()`, `util.isPrimitive()`

### Changed
- Function names: `file.getBase()` -> `file.base()`, `file.getExt()` -> `file.ext()`
- Test names are more descriptive

## [1.11.0](../../compare/1.10.0..1.11.0) - 2022-12-18
### Added
- `array` module with functions: `diff()` and `uniq()`
- Sourcemaps

## [1.10.0](../../compare/1.9.0..1.10.0) - 2022-12-15
### Added
- `time` module with function `ms()`

## [1.9.0](../../compare/1.8.0..1.9.0) - 2022-12-12
### Added
- `file` module with functions: `getBase()`, `getExt()`

## [1.8.0](../../compare/1.7.0..1.8.0) - 2022-12-09
### Added
- Functions to `object` module: `equal()`, `partlyEqual()`, `strictlyEqual()` and `clone()`

## [1.7.0](../../compare/1.6.0..1.7.0) - 2022-12-09
### Added
- `object` module with functions: `deepSeal()` and `deepFreeze()`

## [1.6.0](../../compare/1.5.0..1.6.0) - 2022-12-02
### Added
- `roman` module with functions: `parse()`, `stringify()` and `valid()`

### Removed
- Main `index.js` entry file

## [1.5.0](../../compare/1.4.2..1.5.0) - 2022-11-23
### Added
- Main `index.js` file that exports all available modules

## [1.4.2](../../compare/1.4.1..1.4.2) - 2022-11-22
### Changed
- `string.format()` now inserts double braces in arguments list as is instead of considering them as a escape sequence

## [1.4.1](../../compare/1.4.0..1.4.1) - 2022-11-21
### Added
- Added `clean` script

### Changed
- Escape strategy for `string.format()` changed from backslash to doubling braces

## [1.4.0](../../compare/1.3.0..1.4.0) - 2022-11-17
### Added
- `semver` module with functions: `compare()`, `next()`, `parse()` and `stringify()`

## [1.3.0](../../compare/1.2.0..1.3.0) - 2022-11-17
### Added
- `string` module with functions: `escape()`, `unescape()` and `format()`

## [1.2.0](../../compare/1.1.0..1.2.0) - 2022-11-14
### Added
- `util` module with `curry` function

## [1.1.0](../../compare/1.0.1..1.1.0) - 2022-11-11
### Added
- `getHighestZIndex()` function

## [1.0.1](../../compare/1.0.0..1.0.1) - 2022-11-04
### Changed
- ES to CJS modules
- Changed all exports to default ones

## [1.0.0](../../tree/1.0.0) - 2022-11-04
Release
