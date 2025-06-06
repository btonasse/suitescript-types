declare module "N/search" {
    import { FieldValue } from "N/record";

    /**
 * Encapsulates a search filter used in a search.
 * Use the properties for the Filter object to get and set the filter properties.
 *
 * You create a search filter object with `search.createFilter(options)` and add it to a `search.Search` object that you create with `search.create(options)` or load with search.load(options).
 * 
 * Note: NetSuite uses an implicit AND operator with search filters, as opposed to filter expressions which explicitly use either AND and OR operators. Use the following guidelines with the Filter object:
 * 
 * * To search for a "none of null" value, meaning do not show results without a value for the specified field, use a value of @NONE@ in the Filter.formula property.
 * 
 * * To search on checkbox fields, use the IS operator with a value of T or F to search for checked
or unchecked fields, respectively.
 */
    export interface Filter {
        /** Name or internal ID of the search field as a string. */
        readonly name: string;
        /** Join ID for the search filter as a string. */
        readonly join: string;
        /** Operator used for the search filter. This value is set with the search.Operator enum.
         * The search.Operator enum contains the valid operator values for this property. */
        readonly operator: Operator;
        /** Summary type for the search filter. Use this property to get or set the value of the summary type. See search.Summary. */
        readonly summary: Summary;
        /** Formula used by the search filter. Use this property to get or set the formula used by the search filter. */
        formula: string;
        /** Returns the object type name */
        toString(): string;
        /** Get JSON format of the object */
        toJSON(): {
            name: string;
            join: string | null | undefined;
            operator: keyof typeof Operator;
            summary: keyof typeof Summary | null | undefined;
            formula: string | null | undefined;
            values: string[];
            isor: boolean;
            isnot: boolean;
            leftparens: number;
            rightparens: number;
        };
    }

    interface SearchColumnSetWhenOrderedByOptions {
        /** The name of the search column for which the minimal or maximal value should be found. */
        name: string;
        /** The join id for the search column. */
        join: string;
    }

    /** Encapsulates a single search column in a search.Search. Use the methods and properties available to the Column object to get or set Column properties. */
    export interface Column {
        /** Returns the search column for which the minimal or maximal value should be found when returning the search.Column value. */
        setWhenOrderedBy?(options: SearchColumnSetWhenOrderedByOptions): Column;
        /** Name of a search column as a string. */
        name: string;
        /** Join ID for a search column as a string. */
        join?: string;
        /** Returns the summary type for a search column. */
        summary?: Summary;
        /** Formula used for a search column as a string. To set this value, you must use formulatext, formulanumeric, formuladatetime, formulapercent, or formulacurrency. */
        formula?: string;
        /** Label used for the search column. You can only get or set custom labels with this property. */
        label?: string;
        /** Special function applied to values in a search column. See Help for Supported Functions. */
        function?: string;
        /** The sort order of the column. Use the search.Sort enum to set the value. */
        sort?: Sort;
        /** Returns the object type name */
        toString(): string;
        /** Get JSON format of the object */
        // toJSON(): { // See https://github.com/headintheclouddev/typings-suitescript-2.0/issues/320
        //     name: string;
        //     join: string | null | undefined;
        //     summary: keyof typeof Summary | null | undefined;
        //     label: string | null;
        //     type: string | null;
        //     formula: string | null | undefined;
        //     function: string | null | undefined;
        //     sortdir: keyof typeof Sort;
        //     whenorderedby: string | null | undefined;
        //     whenorderedbyjoin: string | null | undefined;
        //     whenorderedbyalias: string | null | undefined;
        // };
    }

    export interface Result {
        getValue(column: Column | string): boolean | string | string[];
        getText(options: Column | string): string;
        /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object containing all column values by name. */
        getAllValues(): { [fieldId: string]: boolean | string | LookupValueObject[] };
        /** This method is undocumented but works in client and server-side scripts in NetSuite 2019.2.  It returns an object representing the search result. */
        toJSON(): { recordType?: string; id?: string; values: { [columnName: string]: string | boolean } };
        recordType: Type | string;
        id: string;
        columns: Column[];
    }

    interface SearchResultSetGetRangeOptions {
        start: number;
        end: number;
    }

    interface SearchResultSetGetRangeFunction {
        promise(options: SearchResultSetGetRangeOptions): Promise<Result[]>;
        (options: SearchResultSetGetRangeOptions): Result[];
    }

    interface SearchResultSetEachFunction {
        promise(callback: (result: Result) => boolean): Promise<boolean>;
        (callback: (result: Result) => boolean): void;
    }

    export interface ResultSet {
        each: SearchResultSetEachFunction;
        getRange: SearchResultSetGetRangeFunction;
        columns: Column[];
    }

    interface FetchOptions {
        /** The index of the page range that bounds the desired data. */
        index: number;
    }

    interface PageNextFunction {
        promise(): Promise<Page>;
        (): Page;
    }

    interface PagePrevFunction {
        promise(): Promise<Page>;
        (): Page;
    }

    interface PagedDataFetchFunction {
        promise(options: FetchOptions): Promise<Page>;
        (options: FetchOptions): Page;
    }

    export interface Page {
        next: PageNextFunction;
        prev: PagePrevFunction;
        data: Result[];
        isFirst: boolean;
        isLast: boolean;
        pagedData: PagedData;
        /** The PageRange Object used to fetch this Page Object. Page boundary information with the key and label. */
        readonly pageRange: PageRange;
    }

    export interface PageRange {
        compoundLabel: string /** Human-readable label with beginning and ending range identifiers */;
        index: number; // Read only
    }

    export interface PagedData {
        fetch: PagedDataFetchFunction;
        count: number; // Read only
        pageRanges: PageRange[];
        pageSize: number /** Read Only */;
        searchDefinition: Search; // Read only
    }

    interface RunPagedOptions {
        /**
         * Maximum number of entries per page.
         * There is an upper limit, a lower limit, and a default setting:
         * - The maximum number allowed is 1000.
         * - The minimum number allowed is 5.
         * - By default, the page size is set to 50 entries per page.
         */
        pageSize?: number;
    }

    interface SearchRunPagedFunction {
        promise(options?: RunPagedOptions): Promise<PagedData>;
        (options?: RunPagedOptions): PagedData;
    }

    export interface Search {
        searchType: Type | string;
        searchId: number;
        filters: Filter[];
        filterExpression: any[];
        columns: (Column | string)[];
        title: string;
        id: string;
        isPublic: boolean;
        save(): number;
        run(): ResultSet;
        runPaged: SearchRunPagedFunction;
    }

    export interface CreateSearchFilterOptions {
        /** Name or internal ID of the search field. */
        name: string;
        /** Join ID for the search filter. */
        join?: string;
        /** Operator used for the search filter. Use the search.Operator enum. */
        operator: Operator;
        /** Values to be used as filter parameters. */
        values?: FieldValue | FieldValue[] | string | Date | number | string[] | Date[] | number[] | boolean;
        /** Formula used by the search filter. */
        formula?: string;
        /** Summary type for the search filter. */
        summary?: Summary;
    }

    export interface CreateSearchColumnOptions {
        name: string;
        join?: string;
        summary?: Summary;
        formula?: string;
        /**
         * See the list of Supported Function in NetSuite help.
         * For example, use "day" when creating a column to show a date/time column as just a date.
         * Do not specify this property when calling result.getValue(), only use it when creating the search column.
         */
        function?: string;
        label?: string;
        sort?: Sort;
    }

    type LookupValue = string | number | boolean | LookupValueObject[];

    export interface LookupValueObject {
        value: string;
        text: string;
    }

    interface SearchLookupFieldsFunction {
        promise<T extends string>(options: {
            type: Type | string;
            id: FieldValue | string | number;
            columns: T | T[];
        }): Promise<{ [K in T]?: LookupValue }>;

        <T extends string>(options: { type: Type | string; id: FieldValue | string | number; columns: T | T[] }): {
            [K in T]?: LookupValue;
        };
    }

    /** Global search keywords string or expression. */
    interface SearchGlobalOptions {
        keywords: string;
    }

    interface SearchGlobalFunction {
        promise(options: SearchGlobalOptions): Promise<Result[] | undefined>;
        (options: SearchGlobalOptions): Result[];
    }

    interface SearchDuplicatesOptions {
        type: Type | string;
        fields?: string[];
        id?: number;
    }

    interface SearchDuplicatesFunction {
        promise(options: SearchDuplicatesOptions): Promise<Result[]>;
        (options: SearchDuplicatesOptions): Result[];
    }

    interface SearchDeleteOptions {
        id: string | number;
    }

    interface SearchDeleteFunction {
        promise(options: SearchDeleteOptions): Promise<void>;
        (options: SearchDeleteOptions): void;
    }

    interface SearchLoadOptions {
        /** Internal ID or script ID of a saved search. The script ID starts with customsearch. */
        id: string | number;
        /**
         * The search type of the saved search to load. Use a value from the search.Type enum for this parameter.
         * This parameter is required if the saved search to load uses a standalone search type.
         * A standalone search type is a search type that does not have a corresponding record type.
         * Typically, the search type of the saved search can be determined automatically based on the corresponding record type.
         * In this case, this parameter is not required. For standalone search types, you must specify the search type explicitly using this parameter.
         *
         * The following is a list of standalone search types:
         * - DeletedRecord
         * - EndToEndTime
         * - ExpenseAmortPlanAndSchedule
         * - RevRecPlanAndSchedule
         * - GlLinesAuditLog
         * - Crosschargeable
         * - FinRptAggregateFR
         * - BillingAccountBillCycle
         * - BillingAccountBillRequest
         * - BinItemBalance
         * - PaymentEvent
         * - Permission
         * - GatewayNotification
         * - TimeApproval
         * - RecentRecord
         * - Role
         * - SavedSearch
         * - ShoppingCart
         * - SubscriptionRenewalHistory
         * - SuiteScriptDetail
         * - SupplyChainSnapshotDetails
         * - SystemNote
         * - TaxDetail
         * - TimesheetApproval
         * - Uber
         * - ResAllocationTimeOffConflict
         * - ComSearchOneWaySyn
         * - ComSearchGroupSyn
         * - Installment
         * - InventoryBalance
         * - InventoryNumberBin
         * - InventoryNumberItem
         * - InventoryStatusLocation
         * - InvtNumberItemBalance
         * - ItemBinNumber
         */
        type?: string | Type;
    }

    interface SearchLoadFunction {
        promise(options: SearchLoadOptions): Promise<Search>;
        (options: SearchLoadOptions): Search;
    }

    export interface SearchCreateOptions {
        type: Type | string;
        filters?: CreateSearchFilterOptions[] | any[];
        columns?: (Column | string)[];
        title?: string;
        id?: string;
        isPublic?: boolean;
        packageId?: string;
        settings?: Object | Object[] | string | string[] | Setting | Setting[];
        filterExpression?: Object[];
    }

    interface SearchCreateFunction {
        (options: SearchCreateOptions): Search;
        promise(options: SearchCreateOptions): Promise<Search>;
    }

    export enum Type { // As of 15 June 2020
        ACCOUNT,
        ACCOUNTING_BOOK,
        ACCOUNTING_CONTEXT,
        ACCOUNTING_PERIOD,
        ACTIVITY,
        ADV_INTER_COMPANY_JOURNAL_ENTRY,
        AGGR_FIN_DAT,
        ALLOC_RECOMMENDATION_DEMAND,
        ALLOC_RECOMMENDATION_DETAIL,
        AMORTIZATION_SCHEDULE,
        AMORTIZATION_TEMPLATE,
        ASSEMBLY_BUILD,
        ASSEMBLY_ITEM,
        ASSEMBLY_UNBUILD,
        AUTHENTICATE_DEVICE_INPUT,
        BALANCE_TRX_BY_SEGMENTS,
        BALANCING_DETAIL,
        BALANCING_RESULT,
        BALANCING_TRANSACTION,
        BILLING_ACCOUNT,
        BILLING_ACCOUNT_BILL_CYCLE,
        BILLING_ACCOUNT_BILL_REQUEST,
        BILLING_CLASS,
        BILLING_RATE_CARD,
        BILLING_REVENUE_EVENT,
        BILLING_SCHEDULE,
        BIN,
        BIN_ITEM_BALANCE,
        BIN_TRANSFER,
        BIN_WORKSHEET,
        BLANKET_PURCHASE_ORDER,
        BOM,
        BOM_REVISION,
        BONUS,
        BONUS_TYPE,
        BUDGET_EXCHANGE_RATE,
        BULK_OWNERSHIP_TRANSFER,
        BUNDLE_INSTALLATION_SCRIPT,
        CALENDAR_EVENT,
        CAMPAIGN,
        CARDHOLDER_AUTHENTICATION,
        CARDHOLDER_AUTHENTICATION_EVENT,
        CASH_REFUND,
        CASH_SALE,
        CHALLENGE_SHOPPER_INPUT,
        CHARGE,
        CHARGE_RULE,
        CHECK,
        CLASSIFICATION,
        CLIENT_SCRIPT,
        CMS_CONTENT,
        CMS_CONTENT_TYPE,
        CMS_PAGE,
        COMMERCE_CATEGORY,
        COMMERCE_SEARCH_ACTIVITY_DATA,
        COMPETITOR,
        COM_SEARCH_BOOST,
        COM_SEARCH_BOOST_TYPE,
        COM_SEARCH_GROUP_SYN,
        COM_SEARCH_ONE_WAY_SYN,
        CONSOLIDATED_EXCHANGE_RATE,
        CONTACT,
        CONTACT_CATEGORY,
        CONTACT_ROLE,
        COST_CATEGORY,
        COUPON_CODE,
        CREDIT_CARD_CHARGE,
        CREDIT_CARD_REFUND,
        CREDIT_MEMO,
        CURRENCY,
        CURRENCY_EXCHANGE_RATE,
        CUSTOMER,
        CUSTOMER_CATEGORY,
        CUSTOMER_DEPOSIT,
        CUSTOMER_MESSAGE,
        CUSTOMER_PAYMENT,
        CUSTOMER_PAYMENT_AUTHORIZATION,
        CUSTOMER_REFUND,
        CUSTOMER_STATUS,
        CUSTOMER_SUBSIDIARY_RELATIONSHIP,
        CUSTOM_PURCHASE,
        CUSTOM_RECORD,
        CUSTOM_SALE,
        CUSTOM_TRANSACTION,
        DELETED_RECORD,
        DEPARTMENT,
        DEPOSIT,
        DEPOSIT_APPLICATION,
        DESCRIPTION_ITEM,
        DISCOUNT_ITEM,
        DOWNLOAD_ITEM,
        EMPLOYEE,
        EMPLOYEE_CHANGE_REQUEST,
        EMPLOYEE_CHANGE_REQUEST_TYPE,
        EMPLOYEE_PAYROLL_ITEM,
        EMPLOYEE_STATUS,
        EMPLOYEE_TYPE,
        END_TO_END_TIME,
        ENTITY,
        ENTITY_ACCOUNT_MAPPING,
        ESTIMATE,
        EXPENSE_AMORTIZATION_EVENT,
        EXPENSE_AMORT_PLAN_AND_SCHEDULE,
        EXPENSE_CATEGORY,
        EXPENSE_PLAN,
        EXPENSE_REPORT,
        FAIR_VALUE_PRICE,
        FINANCIAL_INSTITUTION,
        FIN_RPT_AGGREGATE_F_R,
        FIXED_AMOUNT_PROJECT_REVENUE_RULE,
        FOLDER,
        FULFILLMENT_REQUEST,
        GATEWAY_NOTIFICATION,
        GENERIC_RESOURCE,
        GIFT_CERTIFICATE,
        GIFT_CERTIFICATE_ITEM,
        GLOBAL_ACCOUNT_MAPPING,
        GLOBAL_INVENTORY_RELATIONSHIP,
        GL_LINES_AUDIT_LOG,
        GL_NUMBERING_SEQUENCE,
        GOAL,
        INBOUND_SHIPMENT,
        INSTALLMENT,
        INTER_COMPANY_JOURNAL_ENTRY,
        INTER_COMPANY_TRANSFER_ORDER,
        INVENTORY_ADJUSTMENT,
        INVENTORY_BALANCE,
        INVENTORY_COST_REVALUATION,
        INVENTORY_COUNT,
        INVENTORY_DEMAND,
        INVENTORY_DETAIL,
        INVENTORY_ITEM,
        INVENTORY_NUMBER,
        INVENTORY_NUMBER_BIN,
        INVENTORY_NUMBER_ITEM,
        INVENTORY_STATUS,
        INVENTORY_STATUS_CHANGE,
        INVENTORY_STATUS_LOCATION,
        INVENTORY_TRANSFER,
        INVOICE,
        INVOICE_GROUP,
        INVT_NUMBER_ITEM_BALANCE,
        ISSUE,
        ITEM,
        ITEM_ACCOUNT_MAPPING,
        ITEM_BIN_NUMBER,
        ITEM_COLLECTION,
        ITEM_COLLECTION_ITEM_MAP,
        ITEM_DEMAND_PLAN,
        ITEM_FULFILLMENT,
        ITEM_GROUP,
        ITEM_LOCATION_CONFIGURATION,
        ITEM_PROCESS_FAMILY,
        ITEM_PROCESS_GROUP,
        ITEM_RECEIPT,
        ITEM_REVISION,
        ITEM_SUPPLY_PLAN,
        JOB,
        JOB_STATUS,
        JOB_TYPE,
        JOURNAL_ENTRY,
        KIT_ITEM,
        LABOR_BASED_PROJECT_REVENUE_RULE,
        LEAD,
        LOCATION,
        LOT_NUMBERED_ASSEMBLY_ITEM,
        LOT_NUMBERED_INVENTORY_ITEM,
        MANUFACTURING_COST_TEMPLATE,
        MANUFACTURING_OPERATION_TASK,
        MANUFACTURING_ROUTING,
        MAP_REDUCE_SCRIPT,
        MARKUP_ITEM,
        MASSUPDATE_SCRIPT,
        MEM_DOC,
        MERCHANDISE_HIERARCHY_LEVEL,
        MERCHANDISE_HIERARCHY_NODE,
        MERCHANDISE_HIERARCHY_VERSION,
        MESSAGE,
        MFG_PLANNED_TIME,
        NEXUS,
        NON_INVENTORY_ITEM,
        NOTE,
        NOTE_TYPE,
        OPPORTUNITY,
        ORDER_TYPE,
        OTHER_CHARGE_ITEM,
        OTHER_NAME,
        OTHER_NAME_CATEGORY,
        PARTNER,
        PARTNER_CATEGORY,
        PAYCHECK,
        PAYCHECK_JOURNAL,
        PAYMENT_EVENT,
        PAYMENT_INSTRUMENT,
        PAYMENT_ITEM,
        PAYMENT_METHOD,
        PAYMENT_OPTION,
        PAYMENT_RESULT_PREVIEW,
        PAYROLL_ITEM,
        PAYROLL_SETUP,
        PCT_COMPLETE_PROJECT_REVENUE_RULE,
        PERFORMANCE_METRIC,
        PERFORMANCE_REVIEW,
        PERFORMANCE_REVIEW_SCHEDULE,
        PERIOD_END_JOURNAL,
        PERMISSION,
        PHONE_CALL,
        PICK_STRATEGY,
        PICK_TASK,
        PORTLET,
        PRICE_BOOK,
        PRICE_LEVEL,
        PRICE_PLAN,
        PRICING,
        PRICING_GROUP,
        PROJECT_EXPENSE_TYPE,
        PROJECT_IC_CHARGE_REQUEST,
        PROJECT_TASK,
        PROJECT_TEMPLATE,
        PROMOTION_CODE,
        PROSPECT,
        PURCHASE_CONTRACT,
        PURCHASE_ORDER,
        PURCHASE_REQUISITION,
        RECENT_RECORD,
        RESOURCE_ALLOCATION,
        RESTLET,
        RES_ALLOCATION_TIME_OFF_CONFLICT,
        RETURN_AUTHORIZATION,
        REVENUE_ARRANGEMENT,
        REVENUE_COMMITMENT,
        REVENUE_COMMITMENT_REVERSAL,
        REVENUE_PLAN,
        REV_REC_PLAN_AND_SCHEDULE,
        REV_REC_SCHEDULE,
        REV_REC_TEMPLATE,
        ROLE,
        SALES_ORDER,
        SALES_ROLE,
        SALES_TAX_ITEM,
        SAVED_SEARCH,
        SCHEDULED_SCRIPT,
        SCHEDULED_SCRIPT_INSTANCE,
        SCRIPT_DEPLOYMENT,
        SERIALIZED_ASSEMBLY_ITEM,
        SERIALIZED_INVENTORY_ITEM,
        SERVICE_ITEM,
        SHIP_ITEM,
        SHOPPING_CART,
        SOLUTION,
        STATE,
        STATISTICAL_JOURNAL_ENTRY,
        STORE_PICKUP_FULFILLMENT,
        SUBSCRIPTION,
        SUBSCRIPTION_CHANGE_ORDER,
        SUBSCRIPTION_LINE,
        SUBSCRIPTION_LINE_REVISION,
        SUBSCRIPTION_PLAN,
        SUBSCRIPTION_RENEWAL_HISTORY,
        SUBSIDIARY,
        SUBTOTAL_ITEM,
        SUITELET,
        SUITE_SCRIPT_DETAIL,
        SUPPLY_CHAIN_SNAPSHOT,
        SUPPLY_CHAIN_SNAPSHOT_DETAILS,
        SUPPORT_CASE,
        SYSTEM_NOTE,
        S_C_M_PREDICTED_RISKS,
        S_C_M_PREDICTION_TRAIN_HISTORY,
        TASK,
        TAX_DETAIL,
        TAX_GROUP,
        TAX_PERIOD,
        TAX_TYPE,
        TERM,
        TIMESHEET_APPROVAL,
        TIME_APPROVAL,
        TIME_BILL,
        TIME_ENTRY,
        TIME_OFF_CHANGE,
        TIME_OFF_PLAN,
        TIME_OFF_REQUEST,
        TIME_OFF_RULE,
        TIME_OFF_TYPE,
        TIME_SHEET,
        TOPIC,
        TRANSACTION,
        TRANSFER_ORDER,
        UBER,
        UNITS_TYPE,
        UNLOCKED_TIME_PERIOD,
        USAGE,
        USEREVENT_SCRIPT,
        VENDOR,
        VENDOR_BILL,
        VENDOR_CATEGORY,
        VENDOR_CREDIT,
        VENDOR_PAYMENT,
        VENDOR_PREPAYMENT,
        VENDOR_PREPAYMENT_APPLICATION,
        VENDOR_RETURN_AUTHORIZATION,
        VENDOR_SUBSIDIARY_RELATIONSHIP,
        WAVE,
        WBS,
        WEBSITE,
        WORKFLOW_ACTION_SCRIPT,
        WORKPLACE,
        WORK_ORDER,
        WORK_ORDER_CLOSE,
        WORK_ORDER_COMPLETION,
        WORK_ORDER_ISSUE,
        ZONE,
    }

    /**
     * Creates a new search and returns it as a search.Search object. The search can be modified and run as an on demand
     * search with Search.run(), without saving it. Alternatively, calling Search.save() will save the search to the
     * database, so it can be reused later in the UI or loaded with search.load(options).
     *
     * Note: This method is agnostic in terms of its options.filters argument. It can accept input of a single search.Filter
     * object, an array of search.Filter objects, or a search filter expression. The search.create(options) method also
     * includes a promise version, search.create.promise(options).
     *
     * Important: When you use this method to create a search, consider the following:
     *
     *  * When you define the search, make sure you sort using the field with the most unique values, or sort using multiple
     *    fields. Sorting with a single field that has multiple identical values can cause the result rows to be in a
     *    different order each time the search is run.
     *
     *  * You cannot directly create a filter or column for a list/record type field in SuiteScript by passing in its text
     *    value. You must use the field’s internal ID. If you must use the field’s text value, you can create a filter or
     *    column with a formula using name: 'formulatext'.
     *
     */
    export const create: SearchCreateFunction;
    export const load: SearchLoadFunction;
    const deleteFunc: SearchDeleteFunction;
    export { deleteFunc as delete };
    export const duplicates: SearchDuplicatesFunction;

    /**
     * Performs a global search against a single keyword or multiple keywords.
     * Similar to the global search functionality in the UI, you can programmatically filter the global
     * search results that are returned. For example, you can use the following filter to limit the
     * returned records to Customer records: `'cu: simpson'`
     *
     * @returns search.Result[] as an array of result objects containing these columns: name, type, info1, and info2
     * Results are limited to 1000 records. If there are no search results, this method returns null.
     */
    export const global: SearchGlobalFunction;

    /**
 * Performs a search for one or more body fields on a record. You can use joined-field lookups with this method, with
 * the following syntax: join_id.field_name The search.lookupFields(options) method also includes a promise version,
 * search.lookupFields.promise(options). 
 *
 * Note that the return contains either an object or a scalar value, depending on whether the looked-up field holds a
 * single value, or a collection of values. Single select fields are returned as an object with value and text
 * properties. Multi-select fields are returned as an object with value: text pairs. 
 *
 * In the following example, a select field like my_select would return an array of objects containing a value and text
 * property. This select field contains multiple entries to select from, so each entry would have a numerical id (the
 * value) and a text display (the text). For "internalid" in this particular code snippet, the sample returns 1234. The
 * internal id of a record is a single value, so a scalar is returned:
```
{
 internalid: 1234, 
 firstname: 'Joe', 
 my_select: [{value: 1, text: 'US Sub'}],
 my_multiselect: [{"value": "1,2", "text": "US Sub, EU Sub" }]
}
```
 * @returns Returns select fields as an object with value and text properties. Returns multiselect fields as an 
 array of object with value:text pairs.
 */
    export const lookupFields: SearchLookupFieldsFunction;

    export function createColumn(options: CreateSearchColumnOptions): Column;
    /** Creates a new search filter as a search.Filter object.
     *
     * Important: You cannot directly create a filter or column for a list/record type field in SuiteScript by passing
     * in its text value. You must use the field’s internal ID. If you must use the field’s text value, you can create
     * a filter or column with a formula using name: 'formulatext'.
     */
    export function createFilter(options: CreateSearchFilterOptions): Filter;

    export function createSetting<K extends SettingName>(options: CreateSearchSettingOptions<K>): Setting;

    interface CreateSearchSettingOptions<K extends SettingName> {
        name: K | string;
        value: SettingValueType[K] | string;
    }

    export interface Setting {
        name: string;
        value: ConsolidationEnum | IncludePeriodTransactionEnum;
    }

    type SettingValueType = {
        [SettingName.consolidationtype]: ConsolidationEnum;
        [SettingName.includeperiodendtransactions]: IncludePeriodTransactionEnum;
    };

    export enum SettingName {
        consolidationtype = "consolidationtype",
        includeperiodendtransactions = "includeperiodendtransactions",
    }

    export enum ConsolidationEnum {
        ACCTTYPE,
        AVERAGE,
        CURRENT,
        HISTORICAL,
        NONE,
    }

    export enum IncludePeriodTransactionEnum {
        F,
        FALSE,
        T,
        TRUE,
    }

    export enum Operator {
        AFTER,
        ALLOF,
        ANY,
        ANYOF,
        BEFORE,
        BETWEEN,
        CONTAINS,
        DOESNOTCONTAIN,
        DOESNOTSTARTWITH,
        EQUALTO,
        GREATERTHAN,
        GREATERTHANOREQUALTO,
        HASKEYWORDS,
        IS,
        ISEMPTY,
        ISNOT,
        ISNOTEMPTY,
        LESSTHAN,
        LESSTHANOREQUALTO,
        NONEOF,
        NOTAFTER,
        NOTALLOF,
        NOTBEFORE,
        NOTBETWEEN,
        NOTEQUALTO,
        NOTGREATERTHAN,
        NOTGREATERTHANOREQUALTO,
        NOTLESSTHAN,
        NOTLESSTHANOREQUALTO,
        NOTON,
        NOTONORAFTER,
        NOTONORBEFORE,
        NOTWITHIN,
        ON,
        ONORAFTER,
        ONORBEFORE,
        STARTSWITH,
        WITHIN,
    }

    export enum Summary {
        GROUP,
        COUNT,
        SUM,
        AVG,
        MIN,
        MAX,
    }

    export enum Sort {
        ASC,
        DESC,
        NONE,
    }
}
