import { expectTypeOf, assertType, describe, it } from "vitest";
import * as recordModule from "N/record";
import * as queryModule from "N/query";

describe("Test global definitions from index.d.ts", () => {
    describe("N modules", () => {
        it("Should correctly type an imported module", () => {
            define(["N/record"], (record) => {
                expectTypeOf(record).toEqualTypeOf<typeof recordModule>();
                expectTypeOf(record).toHaveProperty("create");
                expectTypeOf(record).toHaveProperty("load");
                expectTypeOf(record).toHaveProperty("delete");
                expectTypeOf(record).not.toHaveProperty("badmethod");
                return {};
            });
        });
        it("Should correctly type multiple imported modules", () => {
            define(["N/record", "N/query"], (record, query) => {
                expectTypeOf(record).toEqualTypeOf<typeof recordModule>();
                expectTypeOf(record).toHaveProperty("create");
                expectTypeOf(record).toHaveProperty("load");
                expectTypeOf(record).toHaveProperty("delete");
                expectTypeOf(record).not.toHaveProperty("badmethod");

                expectTypeOf(query).toEqualTypeOf<typeof queryModule>();
                expectTypeOf(query).toHaveProperty("create");
                expectTypeOf(query).toHaveProperty("runSuiteQL");
                expectTypeOf(query).toHaveProperty("Type");
                expectTypeOf(query).not.toHaveProperty("badmethod");
                return {};
            });
        });
        it("Shouldn't matter if the actual module keyword is changed", () => {
            define(["N/record"], (recordtypo) => {
                expectTypeOf(recordtypo).toEqualTypeOf<typeof recordModule>();
                expectTypeOf(recordtypo).toHaveProperty("create");
                expectTypeOf(recordtypo).toHaveProperty("load");
                expectTypeOf(recordtypo).toHaveProperty("delete");
                expectTypeOf(recordtypo).not.toHaveProperty("badmethod");
                return {};
            });
        });
        it("Should error on trying to use non imported modules", () => {
            define(["N/record"], (record) => {
                //@ts-expect-error
                assertType(search);
                //@ts-expect-error
                assertType(query);
                return {};
            });
        });
        it("Should error whyen trying to use malformed imports", () => {
            define(["N/recordtypo"], (record) => {
                //@ts-expect-error
                expectTypeOf(record).toEqualTypeOf<typeof recordModule>();
                //@ts-expect-error
                expectTypeOf(record.create).toExtend<Function>();
                return {};
            });
        });
    });
    describe("global variables", () => {
        it("SS1.0 functions should be available globally", () => {
            expectTypeOf(nlapiGetField).toExtend<Function>();
        });

        it("log and util should be available globally", () => {
            expectTypeOf(log).toHaveProperty("debug");
            expectTypeOf(log).toHaveProperty("audit");
            expectTypeOf(log).toHaveProperty("error");
            expectTypeOf(log).toHaveProperty("emergency");
            expectTypeOf(log).not.toHaveProperty("badmethod");

            expectTypeOf(util).toHaveProperty("isArray");
            expectTypeOf(util).toHaveProperty("isObject");
            expectTypeOf(util).toHaveProperty("isString");
            expectTypeOf(util).not.toHaveProperty("badmethod");
        });

        it("Should allow and provide types for the require function", () => {
            require(["N/record"], (record) => {
                expectTypeOf(record).toEqualTypeOf<typeof recordModule>();
                expectTypeOf(record).toHaveProperty("create");
                expectTypeOf(record).toHaveProperty("load");
                expectTypeOf(record).toHaveProperty("delete");
                expectTypeOf(record).not.toHaveProperty("badmethod");
            });
        });
    });
    describe("custom modules", () => {
        it("Should type a custom module imported with a relative path as unknown", () => {
            define(["./path/to/mymodule", "../path/to/othermodule"], (lib, lib2) => {
                expectTypeOf(lib).toEqualTypeOf<Record<string, unknown>>();
                expectTypeOf(lib2).toEqualTypeOf<Record<string, unknown>>();

                // Type has to be narrowed down before use

                //@ts-expect-error
                assertType(lib.someFunc());

                const typedLib = lib as { someFunc: () => string };
                expectTypeOf(typedLib.someFunc()).toEqualTypeOf<string>();
                return {};
            });
        });
        it("Should type a custom module imported with a non-relative path as never", () => {
            define(["path/to/mymodule", "path/to/othermodule"], (lib, lib2) => {
                expectTypeOf(lib).toEqualTypeOf<never>();
                expectTypeOf(lib2).toEqualTypeOf<never>();

                //@ts-expect-error
                assertType(lib.someFunc());
                return {};
            });
        });
    });
});
