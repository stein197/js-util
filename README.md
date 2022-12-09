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
| Module | Description |
|--------|-------------|
| KeyboardCode | Enum of entries that match KeyboardEvent.code property |
| PromiseState | Enum that denotes states that promises can have |
| object | Object functions |
| html | HTML DOM functions |
| roman | Roman number functions |
| semver | Semantic versioning functions |
| string | String functions |
| util | Common functions |

> NOTE: For more detailed documentation, please, refer to the TSDoc comments in the source code.

## NPM scripts
- `clean` - Clean the working directory from compiled files
- `build` - Compile TypeScript source code
- `test` - Run unit tests
