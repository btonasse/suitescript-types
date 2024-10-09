import * as N_action from "./N/action";
import * as N_auth from "./N/auth";
import * as N_cache from "./N/cache";
import * as N_certificateControl from "./N/certificateControl";
import * as N_compress from "./N/compress";
import * as N_config from "./N/config";
import * as N_crypto from "./N/crypto";
import * as N_currency from "./N/currency";
import * as N_currentRecord from "./N/currentRecord";
import * as N_dataset from "./N/dataset";
import * as N_email from "./N/email";
import * as N_encode from "./N/encode";
import * as N_error from "./N/error";
import * as N_file from "./N/file";
import * as N_format from "./N/format";
import * as N_http from "./N/http";
import * as N_https from "./N/https";
import * as N_keyControl from "./N/keyControl";
import * as N_log from "./N/log";
import * as N_plugin from "./N/plugin";
import * as N_portlet from "./N/portlet";
import * as N_query from "./N/query";
import * as N_piRemoval from "./N/piremoval";
import * as N_record from "./N/record";
import * as N_recordContext from "./N/recordContext";
import * as N_redirect from "./N/redirect";
import * as N_render from "./N/render";
import * as N_runtime from "./N/runtime";
import * as N_search from "./N/search";
import * as N_sftp from "./N/sftp";
import * as N_sso from "./N/sso";
import * as N_suiteAppInfo from "./N/suiteAppInfo";
import * as N_task from "./N/task";
import * as N_transaction from "./N/transaction";
import * as N_translation from "./N/translation";
import * as N_url from "./N/url";
import * as N_util from "./N/util";
import * as N_workbook from "./N/workbook";
import * as N_workflow from "./N/workflow";
import * as N_xml from "./N/xml";
import * as N_commerce_recordView from "./N/commerce/recordView";
import * as N_ui_dialog from "./N/ui/dialog";
import * as N_ui_message from "./N/ui/message";
import * as N_ui_serverWidget from "./N/ui/serverWidget";

import { CallbackReturn } from "./N/entryPoints";

declare global {
  function define<T extends string[]>(deps: [...T], callback: (...args: ModuleTypes<T>) => CallbackReturn): void;
  namespace log {}
  namespace util {}
  //@ts-ignore
  interface Record extends N_record.Record {}
}

// prettier-ignore
type ModuleTypes<T extends readonly string[]> = {
    [K in keyof T]: T[K] extends "N/action" ? typeof N_action :
                    T[K] extends "N/auth"   ? typeof N_auth   :
                    T[K] extends "N/cache"  ? typeof N_cache  :
                    T[K] extends "N/certificateControl" ? typeof N_certificateControl :
                    T[K] extends "N/compress" ? typeof N_compress :
                    T[K] extends "N/config"  ? typeof N_config :
                    T[K] extends "N/crypto"  ? typeof N_crypto :
                    T[K] extends "N/currency" ? typeof N_currency :
                    T[K] extends "N/currentRecord" ? typeof N_currentRecord :
                    T[K] extends "N/dataset" ? typeof N_dataset :
                    T[K] extends "N/email"   ? typeof N_email :
                    T[K] extends "N/encode"  ? typeof N_encode :
                    T[K] extends "N/error"   ? typeof N_error :
                    T[K] extends "N/file"    ? typeof N_file :
                    T[K] extends "N/format"  ? typeof N_format :
                    T[K] extends "N/http"    ? typeof N_http :
                    T[K] extends "N/https"   ? typeof N_https :
                    T[K] extends "N/keyControl" ? typeof N_keyControl :
                    T[K] extends "N/log"     ? typeof N_log :
                    T[K] extends "N/plugin"  ? typeof N_plugin :
                    T[K] extends "N/portlet" ? typeof N_portlet :
                    T[K] extends "N/query"   ? typeof N_query :
                    T[K] extends "N/piRemoval" ? typeof N_piRemoval :
                    T[K] extends "N/recordContext" ? typeof N_recordContext :
                    T[K] extends "N/record" ? typeof N_record :
                    T[K] extends "N/redirect" ? typeof N_redirect :
                    T[K] extends "N/render"  ? typeof N_render :
                    T[K] extends "N/runtime" ? typeof N_runtime :
                    T[K] extends "N/search" ? typeof N_search :
                    T[K] extends "N/sftp"   ? typeof N_sftp :
                    T[K] extends "N/sso"    ? typeof N_sso :
                    T[K] extends "N/suiteAppInfo" ? typeof N_suiteAppInfo :
                    T[K] extends "N/task"   ? typeof N_task :
                    T[K] extends "N/transaction" ? typeof N_transaction :
                    T[K] extends "N/translation" ? typeof N_translation :
                    T[K] extends "N/url"    ? typeof N_url :
                    T[K] extends "N/workbook" ? typeof N_workbook :
                    T[K] extends "N/workflow" ? typeof N_workflow :
                    T[K] extends "N/xml"    ? typeof N_xml :
                    T[K] extends "N/commerce/recordView" ? typeof N_commerce_recordView :
                    T[K] extends "N/ui/dialog" ? typeof N_ui_dialog :
                    T[K] extends "N/ui/message" ? typeof N_ui_message :
                    T[K] extends "N/ui/serverWidget" ? typeof N_ui_serverWidget :
                    never;
};

export {};
