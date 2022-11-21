import * as string from "./string";

// TODO: tests
/**
 * The decorator that applies to method parameters. It limits the range a numeric argument can have. If the argument
 * does not satisfy restrictions, an error will be thrown.
 * @param min Lower range boundary.
 * @param max Upper range boundary.
 */
export function between(min: number, max: number): Function {
	return function (target: object, name: string, index: number): void {
		const original = target[name];
		target[name] = function (...args): any {
			if (args[index] < min || max < args[index])
				throw new Error(`The argument at ${index} with value ${args[index]} for ${name}() does not fall into the range of [${min}; ${max}]`);
			return original.call(this, ...args);
		}
	}
}

// TODO: tests
/**
 * The decorator that applies to method parameters. It limits the range a string argument can have. If the argument does
 * not satisfy the pattern, an error will be thrown.
 * @param regex A pattern that the parameter should match.
 */
export function match(regex: RegExp): Function {
	return function (target: object, name: string, index: number): void {
		const original = target[name];
		target[name] = function (...args): any {
			if (args[index].search(regex) < 0)
				throw new Error(`The argument at ${index} with value "${string.escape(args[index])}" for ${name}() does not match the regex ${regex}`);
			return original.call(this, ...args);
		}
	}
}
