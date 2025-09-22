import { expectTypeOf, assertType, describe, it } from "vitest";
import * as record from "N/record";
describe("Test N/record module", () => {
    it("Should type record.create correctly", () => {
        expectTypeOf(record.create).returns.toEqualTypeOf<record.Record>;
        expectTypeOf<record.Record>(record.create({ type: record.Type.ACCOUNT }));
        expectTypeOf<record.Record>(record.create({ type: "account" }));
        expectTypeOf<record.Record>(record.create({ type: "customrecord1" }));
        //@ts-expect-error
        assertType(record.create({ type: "impossible_name" }));
    });

    it("Sublist interface should be typed correctly", () => {
        expectTypeOf<record.Record>().toHaveProperty("getSublist").returns.toEqualTypeOf<record.Sublist>();
        expectTypeOf<record.Sublist>().toHaveProperty("toJSON").returns.toBeObject();
        expectTypeOf<record.Sublist>().toHaveProperty("toString").returns.toBeString();
        expectTypeOf<record.Sublist>().toHaveProperty("getColumn").returns.toEqualTypeOf<record.Column>();
    });
});
