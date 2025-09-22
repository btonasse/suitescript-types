/**
 * @NAPIVersion 2.1
 * @NScriptType Restlet
 */

define([], () => {
    return {
        delete: (requestParams) => {
            // Unknown type. Need to be narrowed if using their properties.
            const type = requestParams.type;

            if (typeof type === "string" && type.startsWith("someType")) {
                return {
                    success: true,
                };
            } else {
                throw new Error("Wrong 'type' parameter");
            }
        },
        post: (requestBody) => {
            return { success: true };
        },
    };
});
