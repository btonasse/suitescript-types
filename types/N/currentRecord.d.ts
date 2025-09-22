declare module "N/currentRecord" {
    import { ClientCurrentRecord } from "N/record";

    interface GetCurrentRecordFunction {
        (): ClientCurrentRecord;
        promise(): Promise<ClientCurrentRecord>;
    }

    export const get: GetCurrentRecordFunction;
}
