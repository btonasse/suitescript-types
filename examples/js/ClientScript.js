/**
 * @NAPIVersion 2.1
 * @NScriptType ClientScript
 */
define(["N/search"], (search) => {
    return {
        pageInit: (context) => {
            if (context.mode != "edit") return;

            const customerId = context.currentRecord.getValue("entity"); // Assume this script is running on a transaction
            search.lookupFields
                .promise({ type: "customer", id: customerId, columns: ["companyname", "datecreated", "entitystatus"] })
                .then((values) => {
                    const name = /**@type{string}*/ (values.companyname);
                    const date = /**@type{string}*/ (values.datecreated);
                    const status = /**@type{{ value: string; text: string }[]}*/ (values.entitystatus);
                    console.log("Customer", name, "created at", date, "status", status);
                });

            search.create
                .promise({
                    type: "customer",
                    filters: [search.createFilter({ name: "companyname", operator: search.Operator.ISNOTEMPTY })],
                    columns: [
                        // Not generally recommended to mix column creation formats like this, but it is technically acceptable. This demonstrates different ways to do it:
                        search.createColumn({ name: "companyname", sort: search.Sort.ASC }),
                        { name: "email" },
                        "fax",
                    ],
                })
                .then((search) => {
                    return search.run().getRange.promise({ start: 0, end: 1 });
                })
                .then((results) => {
                    if (results.length === 0) return alert("No companies");
                    alert(`First company alphabetically: ${results[0].getValue("companyname")}`);
                });
        },
    };
});
