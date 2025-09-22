/**
 * @NAPIVersion 2.1
 * @NScriptType UserEventScript
 */

import type { UserEvent } from "N/entryPoints";
import * as log from "N/log";
import * as query from "N/query";

// Let's assume this example is deployed to sales orders
export function beforeSubmit(context: UserEvent.beforeSubmitContext) {
    if (context.type == context.UserEventType.CREATE) {
        const customerId = context.newRecord.getValue("entity") as string;
        log.debug("beforeSubmit", `Submitting new transaction for entity: ${customerId}`); // When creating a transaction from an entity, log the entity internal id

        // SuiteQL example
        const results: { companyname: string }[] = query
            .runSuiteQL({
                query: `SELECT companyName FROM customer WHERE id = ?`,
                params: [customerId],
            })
            .asMappedResults() as any;
        log.debug("beforeSubmit", `Customer ${customerId} values: ${JSON.stringify(results)}`);
    }
}
