# SuiteScript 2.1 Typings

This is a fork of the awesome `@hitc/netsuite-types`. The main purpose of this library is to provide typing support for vanilla JS development alongside the Typescript support of the original library.

In other words, you can either use Typescript, or keep writing vanilla JS and enjoy full Intellisense/autocompletion on:

- The imported module instance objects (as long as they're valid `N/` modules)
- The entry point context objects
- Global modules like `N/log` and `N/util`

## Installation Instructions

`npm install --save-dev @btonasse/suitescript-types`

Once installed, create a file called `tsconfig.json` (for Typescript projects) or `jsconfig.json` (for vanilla JS):

`jsconfig.json`:

```json
{
    "compilerOptions": {
        "lib": ["es2022", "DOM"],
        "allowJs": true,
        "checkJs": true,
        "noEmit": true,
        "strict": true,
        "target": "ES2022",
        "skipLibCheck": true,
        "moduleResolution": "node",
        "paths": {
            "N/*": ["./node_modules/@btonasse/suitescript-types/types/N/*"]
        }
    },
    "files": [
        "./node_modules/@btonasse/suitescript-types/types/index.d.ts",
        "./node_modules/@btonasse/suitescript-types/types/SuiteScriptV1.d.ts"
    ],
    "include": ["./**/*.js"],
    "exclude": ["node_modules"]
}
```

`tsconfig.json`:

```json
{
    "compilerOptions": {
        "module": "amd",
        "lib": ["es2022", "DOM"],
        "allowJs": true,
        "checkJs": true,
        "strict": true,
        "target": "ES2022",
        "skipLibCheck": true,
        "moduleResolution": "node",
        "paths": {
            "N/*": ["./node_modules/@btonasse/suitescript-types/types/N/*"]
        }
    },
    "files": [
        "./node_modules/@btonasse/suitescript-types/types/index.d.ts",
        "./node_modules/@btonasse/suitescript-types/types/SuiteScriptV1.d.ts"
    ],
    "include": ["./**/*.ts"],
    "exclude": ["node_modules"]
}
```

## Usage

### Callback function and entry points

To get Intellisense/autocompletion in JS files, you can structure your callback function in two different ways:

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/record", "N/search"], (record, search) => {
    return {
        beforeLoad: (scriptContext) => {
            // entry point implementation
        },
        beforeSubmit: (scriptContext) => {
            // entry point implementation
        },
    };
});
```

Or

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(["N/record", "N/search"], (record, search) => {
    /** @type {import("N/entryPoints").UserEvent.beforeLoad} */
    const beforeLoad = (scriptContext) => {
        // entry point implementation
    };
    /** @type {import("N/entryPoints").UserEvent.beforeSubmit} */
    const beforeSubmit = (scriptContext) => {
        // entry point implementation
    };

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
    };
});
```

### JSDoc types

Usually your IDE will pick-up the correct type in a JSDoc annotation. However, for certain interfaces like `Record` and `Sublist`, there can be conflicts with either built-in interfaces or other `N` modules. For example:

```javascript
/**
 * @param {Record} currentRecord
 */
const myFunc = (currentRecord) => {
    // What is the type of currentRecord?
};
```

In the example above the IDE might not infer the type correctly (are we're referring to `N/record`, `N/workbook` or even the typescript built-in with the same name?). To solve this, use import types as per [the official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#other)

```javascript
/**
 * @param {import("N/record").Record} currentRecord
 */
const myFunc = (currentRecord) => {
    // Now we know we're talking about N/record!
};
```
