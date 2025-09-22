/**
 * @NAPIVersion 2.1
 * @NScriptType UserEventScript
 */

define(["N/query"], (query) => {
    return {
        beforeSubmit: (context) => {
            if (context.type == context.UserEventType.CREATE) {
                const customerId = /**@type{string}*/ (context.newRecord.getValue("entity"));
                log.debug("beforeSubmit", `Submitting new transaction for entity: ${customerId}`);
                const results = /**@type{{companyname: string}[]}*/ (
                    query
                        .runSuiteQL({
                            query: `SELECT companyName FROM customer WHERE id = ?`,
                            params: [customerId],
                        })
                        .asMappedResults()
                );
                log.debug("beforeSubmit", `Customer ${customerId} values: ${JSON.stringify(results)}`);
            }
        },
    };
});
