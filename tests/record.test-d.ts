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

        expectTypeOf(record.create.promise).returns.toEqualTypeOf<Promise<record.Record>>();
    });

    it("Sublist interface should be typed correctly", () => {
        expectTypeOf<record.Record>().toHaveProperty("getSublist").returns.toEqualTypeOf<record.Sublist>();
        expectTypeOf<record.Sublist>().toHaveProperty("toJSON").returns.toBeObject();
        expectTypeOf<record.Sublist>().toHaveProperty("toString").returns.toBeString();
        expectTypeOf<record.Sublist>().toHaveProperty("getColumn").returns.toEqualTypeOf<record.Column>();
    });

    it("Should type record.load correctly", () => {
        expectTypeOf(record.load).returns.toEqualTypeOf<record.Record & { id: number }>();
        expectTypeOf<record.Record & { id: number }>(record.load({ type: record.Type.CUSTOMER, id: 123 }));
        expectTypeOf<record.Record & { id: number }>(record.load({ type: "customrecord_mytype", id: "456" }));
        // @ts-expect-error
        record.load({ type: record.Type.CUSTOMER });
        // @ts-expect-error
        record.load({ id: 123 });
        // @ts-expect-error
        record.load({ type: "notarealtype", id: 1 });

        expectTypeOf(record.load.promise).returns.toEqualTypeOf<Promise<record.Record & { id: number }>>();
    });

    it("Should type record.copy correctly", () => {
        expectTypeOf(record.copy).returns.toEqualTypeOf<record.Record>();
        expectTypeOf<record.Record>(record.copy({ type: record.Type.INVOICE, id: 789 }));
        // @ts-expect-error
        record.copy({ type: record.Type.INVOICE });
        // @ts-expect-error
        record.copy({ id: 789 });

        expectTypeOf(record.copy.promise).returns.toEqualTypeOf<Promise<record.Record>>();
    });

    it("Should type record.transform correctly", () => {
        expectTypeOf(record.transform).returns.toEqualTypeOf<record.Record>();
        expectTypeOf<record.Record>(
            record.transform({
                fromType: record.Type.SALES_ORDER,
                fromId: 1,
                toType: record.Type.INVOICE,
            })
        );
        // @ts-expect-error
        record.transform({ fromId: 1, toType: record.Type.INVOICE });
        // @ts-expect-error
        record.transform({ fromType: record.Type.SALES_ORDER, toType: record.Type.INVOICE });
        // @ts-expect-error
        record.transform({ fromType: record.Type.SALES_ORDER, fromId: 1 });

        expectTypeOf(record.transform.promise).returns.toEqualTypeOf<Promise<record.Record>>();
    });

    it("Should type record.delete correctly", () => {
        expectTypeOf(record.delete).returns.toEqualTypeOf<number>();
        expectTypeOf<number>(record.delete({ type: record.Type.ACCOUNT, id: 123 }));
        // @ts-expect-error
        record.delete({ type: record.Type.ACCOUNT });
        // @ts-expect-error
        record.delete({ id: 123 });

        expectTypeOf(record.delete.promise).returns.toEqualTypeOf<Promise<number>>();
    });

    it("Intermediary deleteFunc should not be exposed", () => {
        //@ts-expect-error
        assertType(record.deleteFunc);
    });

    it("Should type record.submitFields correctly", () => {
        expectTypeOf(record.submitFields).returns.toEqualTypeOf<number>();
        expectTypeOf(record.submitFields)
            .parameter(0)
            .toHaveProperty("values")
            .toEqualTypeOf<Record<string, record.FieldValue>>();
        expectTypeOf<number>(
            record.submitFields({ type: record.Type.CUSTOMER, id: 1, values: { companyname: "Acme" } })
        );
        // @ts-expect-error
        record.submitFields({ type: record.Type.CUSTOMER, id: 1 });
        // @ts-expect-error
        record.submitFields({ type: record.Type.CUSTOMER, values: { companyname: "Acme" } });
        // @ts-expect-error
        record.submitFields({ id: 1, values: "Acme" });

        expectTypeOf(record.submitFields.promise).returns.toEqualTypeOf<Promise<number>>();
    });

    it("Should type record.Type enum correctly", () => {
        expectTypeOf(record.Type.ACCOUNT).toBeString();
        expectTypeOf(record.Type.INVOICE).toBeString();
        // @ts-expect-error
        record.Type.NOT_A_TYPE;
    });

    it("Should type record.attach/detach correctly", () => {
        expectTypeOf(record.attach).returns.toEqualTypeOf<void>();
        expectTypeOf(record.detach).returns.toEqualTypeOf<void>();
        // @ts-expect-error
        record.attach({});
        // @ts-expect-error
        record.detach({});
    });

    it("Record instance should expose expected methods and properties", () => {
        const rec = record.create({ type: record.Type.ACCOUNT });

        expectTypeOf(rec.save).returns.toEqualTypeOf<number>();
        expectTypeOf(rec.toJSON).returns.toEqualTypeOf<record.RecordToJSONReturnValue>();
        expectTypeOf(rec.getFields).returns.toEqualTypeOf<string[]>();
        expectTypeOf(rec.getSublists).returns.toEqualTypeOf<string[]>();
        expectTypeOf(rec.getSublistFields).returns.toEqualTypeOf<string[]>();

        expectTypeOf(rec.getSublist({ sublistId: "sublistId" })).toEqualTypeOf<record.Sublist>();
        //@ts-expect-error
        expectTypeOf(rec.getSublist("sublistId")).toEqualTypeOf<record.Sublist>();
        expectTypeOf(rec.getValue("someField")).toEqualTypeOf<record.FieldValue>();
        expectTypeOf(rec.getValue({ fieldId: "someField" })).toEqualTypeOf<record.FieldValue>();

        expectTypeOf(rec.getText).returns.toEqualTypeOf<string | string[]>();
        expectTypeOf(rec.getSublistValue).returns.toEqualTypeOf<record.FieldValue>();
        expectTypeOf(rec.getSublistText).returns.toEqualTypeOf<string>();
        expectTypeOf(rec.getSublistField).returns.toEqualTypeOf<record.Field>();
        expectTypeOf(rec.setValue).returns.toEqualTypeOf<record.Record>();
        expectTypeOf(rec.id).toEqualTypeOf<number | null>();
        expectTypeOf(rec.type).toEqualTypeOf<record.RecordType>();
        expectTypeOf(rec.isDynamic).toBeBoolean();
        expectTypeOf(rec.isNew).toBeBoolean();
        expectTypeOf(rec.isReadOnly).toBeBoolean();
    });

    it("Record.toJSON() should return the correct shape", () => {
        const mock = {
            id: "123",
            type: "customer",
            isDynamic: true,
            fields: { name: "Acme" },
            sublists: { item: { "1": { quantity: "2" } } },
        };
        expectTypeOf(mock).toExtend<record.RecordToJSONReturnValue>();
    });
});
