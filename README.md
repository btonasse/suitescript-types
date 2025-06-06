# SuiteScript 2.1 Typings

This is a fork of the awesome `@hitc/netsuite-types`. The main difference is that the purpose of this library is to provide typings for JS files - not TypeScript - and without needing to change anything in how you write your suitescripts.
This means that instead of using an `EntryPoints` object and having to import global modules like `log`, we define these in the global scope.

## Installation Instructions

`npm install --save-dev @btonasse/suitescript-types`

## Usage

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

## Updates

You can download the latest published typings library at any time by simply running the command:

`npm install --save-dev @hitc/netsuite-types`
