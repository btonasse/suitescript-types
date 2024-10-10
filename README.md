# SuiteScript 2.1 Typings

This is a fork of the awesome `@hitc/netsuite-types`. The main difference is that the purpose of this library is to provide typings for JS files - not TypeScript - and without needing to change anything in how you write your suitescripts.

This means you can keep writing vanilla JS and enjoy full Intellisense/autocompletion on:

-   The imported module instance objects (as long as they're valid `N/` modules)
-   The entry point context objects
-   Global modules like `N/log` and `N/util`

## Installation Instructions

You can either add this package as a library to your IDE or as a dev dependency directly to your project.

### As a project dependency

`npm install --save-dev @btonasse/suitescript-types`

Once installed, create a file called `tsconfig.json` in your project root and have these options configured:

```json
{
    "compilerOptions": {
        "allowJs": true,
        "checkJs": true,
        "noEmit": true,
        "typeRoots": ["./node_modules/@btonasse/suitescript-types"],
        "strict": true
    },
    "include": ["src/**/*.js"],
    "exclude": ["node_modules"]
}
```

You can download the latest published typings library at any time by simply running the install command again.

### IDE set-up (WebStorm)

1. Clone this repo to a local folder
2. Go to `Settings -> Languages & Frameworks -> JavaScript -> Libraries`
3. Click `Add...` and select the local folder

> :warning: If you're using Oracle's SuiteCloud Development Framework plugin, you need to disable the SuiteScript1.0 and SuiteScript2.0 modules that are automatically added to new projects under the `.idea` folder, otherwise they will shadow this package's definitions.

## Usage

### Callback function and entry points

To get Intellisense/autocompletion, you can structure your callback function in two different ways:

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
    /** @type {EntryPoint.UserEvent.beforeLoad} */
    const beforeLoad = (scriptContext) => {
        // entry point implementation
    };
    /** @type {EntryPoint.UserEvent.beforeSubmit} */
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
 * {Record} currentRecord 
 */
const myFunc = (currentRecord) => {
    // What is the type of currentRecord?
}
```

In the example above the IDE doesn't know if we're referring to `N/record`, `N/workbook` or even the typescript built-in with the same name. To solve this, the `record` and `workbook` keywords are exported to the global scope as namespaces. Usage:

```javascript
/**
 * {record.Record} currentRecord 
 */
const myFunc = (currentRecord) => {
    // Now we know we're talking about N/record!
}
```