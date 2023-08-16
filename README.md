# Handy utilities
The package is a simple bunch of useful utilities

## Installation
```
npm install @stein197/util
```

## API
To include the module, import it like this:
```ts
import * as moduleName from "@stein197/util/moduleName";
// or
const moduleName = require("@stein197/util/moduleName");
```

**Modules**
- `array`
- `char`
- `KeyboardCode`
- `PromiseState`
- `file`
- `html`
- `json`
- `mime`
- `object`
- `semver`
- `string`
- `time`
- `util`

> NOTE: For more detailed documentation, please, refer to the TSDoc comments in the source code.

## npm scripts
- `build` - Run `clean`, `test` and `ts`
- `clean` - Clean the working directory from compiled files
- `test` - Run unit tests
- `ts` - Compile the project
- `ts:check` - Run TypeScript validation without compiling
