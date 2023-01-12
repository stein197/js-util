# CHANGELOG

## [Unreleased]

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
