import { CallbackReturn } from "N/entryPoints";

declare global {
    function define<T extends string[]>(deps: [...T], callback: (...args: ModuleTypes<T>) => CallbackReturn): void;
    function require<T extends string[]>(deps: [...T], callback: (...args: ModuleTypes<T>) => void): void;
    var log: typeof import("N/log");
    var util: typeof import("N/util");
    interface ModuleMap {
        "N/action": typeof import("N/action");
        "N/auth": typeof import("N/auth");
        "N/cache": typeof import("N/cache");
        "N/certificateControl": typeof import("N/certificateControl");
        "N/compress": typeof import("N/compress");
        "N/config": typeof import("N/config");
        "N/crypto": typeof import("N/crypto");
        "N/crypto/certificate": typeof import("N/crypto/certificate");
        "N/crypto/random": typeof import("N/crypto/random");
        "N/currency": typeof import("N/currency");
        "N/currentRecord": typeof import("N/currentRecord");
        "N/dataset": typeof import("N/dataset");
        "N/email": typeof import("N/email");
        "N/encode": typeof import("N/encode");
        "N/error": typeof import("N/error");
        "N/file": typeof import("N/file");
        "N/format": typeof import("N/format");
        "N/http": typeof import("N/http");
        "N/https": typeof import("N/https");
        "N/keyControl": typeof import("N/keyControl");
        "N/llm": typeof import("N/llm");
        "N/log": typeof import("N/log");
        "N/machineTranslation": typeof import("N/machineTranslation");
        "N/plugin": typeof import("N/plugin");
        "N/portlet": typeof import("N/portlet");
        "N/query": typeof import("N/query");
        "N/pgp": typeof import("N/pgp");
        "N/piremoval": typeof import("N/piremoval");
        "N/recordContext": typeof import("N/recordContext");
        "N/record": typeof import("N/record");
        "N/redirect": typeof import("N/redirect");
        "N/render": typeof import("N/render");
        "N/runtime": typeof import("N/runtime");
        "N/search": typeof import("N/search");
        "N/sftp": typeof import("N/sftp");
        "N/sso": typeof import("N/sso");
        "N/suiteAppInfo": typeof import("N/suiteAppInfo");
        "N/task": typeof import("N/task");
        "N/transaction": typeof import("N/transaction");
        "N/translation": typeof import("N/translation");
        "N/url": typeof import("N/url");
        "N/workbook": typeof import("N/workbook");
        "N/workflow": typeof import("N/workflow");
        "N/xml": typeof import("N/xml");
        "N/commerce/recordView": typeof import("N/commerce/recordView");
        "N/ui/dialog": typeof import("N/ui/dialog");
        "N/ui/message": typeof import("N/ui/message");
        "N/ui/serverWidget": typeof import("N/ui/serverWidget");
        "N/scriptTypes/restlet": typeof import("N/scriptTypes/restlet");
    }
}

// prettier-ignore
type ModuleTypes<T extends readonly string[]> = {
    [K in keyof T]: 
        T[K] extends keyof ModuleMap ? ModuleMap[T[K]] :
        T[K] extends `./${string}` | `../${string}` ? Record<string, unknown> :
        never;
};

export {};
