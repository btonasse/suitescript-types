declare module "N/currentRecord" {
    import type { ClientCurrentRecord } from "N/record";

    interface GetCurrentRecordFunction {
        (): ClientCurrentRecord;
        promise(): Promise<ClientCurrentRecord>;
    }

    export const get: GetCurrentRecordFunction;
}
