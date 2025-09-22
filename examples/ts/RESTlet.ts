/**
 * @NAPIVersion 2.1
 * @NScriptType Restlet
 */

import type { RESTlet } from "N/entryPoints";
import * as log from "N/log";

const del: RESTlet.delete_ = (requestParams) => {
    let type = requestParams.type;
    let id = requestParams.id;

    return {
        success: true,
    };
};
export { del as delete };

export const post: RESTlet.post = (requestBody) => {
    return { success: true };
};
