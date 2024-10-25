import { CallbackReturn } from "./N/entryPoints";

declare global {
    function define<T extends string[]>(deps: [...T], callback: (...args: ModuleTypes<T>) => CallbackReturn): void;
    var log: typeof import("N/log");
    var util: typeof import("N/util");
    namespace record {
        type Record = import("N/record").Record;
        type Sublist = import("N/record").Sublist;
    }
    namespace workbook {
        type Record = import("N/workbook").Record;
    }
    namespace serverWidget {
        type Sublist = import("N/ui/serverWidget").Sublist;
    }
    namespace search {
        type Result = import("N/search").Result;
    }
    namespace query {
        type Result = import("N/query").Result;
    }
}

// prettier-ignore
type ModuleTypes<T extends readonly string[]> = {
    [K in keyof T]: T[K] extends "N/action" ? typeof import("N/action") :
                    T[K] extends "N/auth"   ? typeof import("N/auth")   :
                    T[K] extends "N/cache"  ? typeof import("N/cache")  :
                    T[K] extends "N/certificateControl" ? typeof import("N/certificateControl") :
                    T[K] extends "N/compress" ? typeof import("N/compress") :
                    T[K] extends "N/config"  ? typeof import("N/config") :
                    T[K] extends "N/crypto"  ? typeof import("N/crypto") :
                    T[K] extends "N/currency" ? typeof import("N/currency") :
                    T[K] extends "N/currentRecord" ? typeof import("N/currentRecord") :
                    T[K] extends "N/dataset" ? typeof import("N/dataset") :
                    T[K] extends "N/email"   ? typeof import("N/email") :
                    T[K] extends "N/encode"  ? typeof import("N/encode") :
                    T[K] extends "N/error"   ? typeof import("N/error") :
                    T[K] extends "N/file"    ? typeof import("N/file") :
                    T[K] extends "N/format"  ? typeof import("N/format") :
                    T[K] extends "N/http"    ? typeof import("N/http") :
                    T[K] extends "N/https"   ? typeof import("N/https") :
                    T[K] extends "N/keyControl" ? typeof import("N/keyControl") :
                    T[K] extends "N/log"     ? typeof import("N/log") :
                    T[K] extends "N/plugin"  ? typeof import("N/plugin") :
                    T[K] extends "N/portlet" ? typeof import("N/portlet") :
                    T[K] extends "N/query"   ? typeof import("N/query") :
                    T[K] extends "N/piremoval" ? typeof import("N/piremoval") :
                    T[K] extends "N/recordContext" ? typeof import("N/recordContext") :
                    T[K] extends "N/record" ? typeof import("N/record") :
                    T[K] extends "N/redirect" ? typeof import("N/redirect") :
                    T[K] extends "N/render"  ? typeof import("N/render") :
                    T[K] extends "N/runtime" ? typeof import("N/runtime") :
                    T[K] extends "N/search" ? typeof import("N/search") :
                    T[K] extends "N/sftp"   ? typeof import("N/sftp") :
                    T[K] extends "N/sso"    ? typeof import("N/sso") :
                    T[K] extends "N/suiteAppInfo" ? typeof import("N/suiteAppInfo") :
                    T[K] extends "N/task"   ? typeof import("N/task") :
                    T[K] extends "N/transaction" ? typeof import("N/transaction") :
                    T[K] extends "N/translation" ? typeof import("N/translation") :
                    T[K] extends "N/url"    ? typeof import("N/url") :
                    T[K] extends "N/workbook" ? typeof import("N/workbook") :
                    T[K] extends "N/workflow" ? typeof import("N/workflow") :
                    T[K] extends "N/xml"    ? typeof import("N/xml") :
                    T[K] extends "N/commerce/recordView" ? typeof import("N/commerce/recordView") :
                    T[K] extends "N/ui/dialog" ? typeof import("N/ui/dialog") :
                    T[K] extends "N/ui/message" ? typeof import("N/ui/message") :
                    T[K] extends "N/ui/serverWidget" ? typeof import("N/ui/serverWidget") :
                    T[K] extends "N/scriptTypes/restlet" ? typeof import("N/scriptTypes/restlet") :
                    T[K] extends `./${string}` ? Record<string, Function> :
                    never;
};

export {};
