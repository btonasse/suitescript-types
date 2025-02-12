declare module "plugins/EPPlugin" {
    type PaymentType = "EFT" | "CR" | "DD" | "PP";

    type ColumnType = "text" | "integer" | "date" | "currency";

    type ColumnDisplayType = "normal" | "hidden";

    type AddColumnArgs = [
        type: ColumnType,
        name: string,
        reference: string,
        isText?: boolean,
        displayType?: ColumnDisplayType,
        defaultValue?: string,
        join?: string
    ];

    type FilterType = "text" | "date" | "checkbox" | "select" | "multiselect" | "integer" | "currency" | "longtext";

    type FilterDisplayType = "inline" | "normal" | "hidden" | "disabled";

    type AddFilterArgs = [
        isDefaultFilter: boolean,
        reference: string,
        type: FilterType,
        label: string,
        displayType?: FilterDisplayType,
        defaultValue?: string,
        helpText?: string,
        source?: string,
        maxLength?: string
    ];

    interface EPForm {
        /**
         * Use the setPaymentType method to setup the payment type.
         * @throws {EP_API_PAYMENTTYPE_INVALID} – The error EP_API_PAYMENTTYPE_INVALID is displayed if the payment type is invalid. The supported payment types are DD, EFT, CR and PP.
         */
        setPaymentType: (pTypeParam: PaymentType) => void;
        /**
         * Use setGlobalPayment to setup the global payments Suitelet.
         * @throws {EP_API_GLOBALPAYMENT_INVALID} – The error EP_API_GLOBALPAYMENT_INVALID is displayed if the setGlobalPayment is invalid. The supported global parameters are true and false
         */
        setGlobalPayment: (globalParam: boolean) => void;
        /**
         * Adds a column on the sublist of the Invoice Payment Processing page to display field values from the records searched.
         *
         * Parameters
         *
         * type {string} [required] – The field type of the column. Valid arguments are listed below.
         *     text
         *     integer
         *     date
         *     currency
         *
         * name {string} [required] – The name of the column displayed on the sublist of the Invoice Payment Processing page.
         *
         * reference {string} [required] – The internal ID name of the column you want to add on the sublist. The reference argument can be a standard or custom entity field. The reference argument can also be a standard or custom transaction field.
         *
         * isText {Boolean true|false} [optional] – If value is true, the column displays the text or readable value of the field. If the value is false, the column displays the id of the field value.
         *
         * displayType {string} [optional] – The display type of the column added to the sublist on the Invoice Payment Processing page. Valid arguments are listed below.
         *     normal
         *     hidden
         *
         * defaultValue {string} [optional] – The default value of the column that is displayed on the sublist automatically when the Invoice Payment Processing page loads.
         *
         * join {string} [optional] – The join id for the search return column.
         *
         * @throws {EP_API_INVALID_COLUMNTYPE_VALUE} – Thrown when column type has invalid values added. Refer to the valid column type values.
         * @throws {EP_API_INVALID_COLUMNISTEXT_VALUE} – Thrown when isText value is not Boolean.
         * @throws {EP_API_INVALID_COLUMNDISPLAYTYPE_VALUE} – Thrown when displayType value is invalid. Refer to the valid displayType column values.
         * @throws {EP_API_MISSING_COLUMN_FIELDS} – Thrown when a required argument is missing [type, name, reference].
         */
        AddColumn: (...args: AddColumnArgs) => void;
        /**
         * Adds a filter on the Bill Payment Processing page. The filter refines the search of bills to be processed.
         *
         * Parameters
         *
         * isDefaultFilter {Boolean true|false} [required] – If value is true, the filter is added to the existing Search Filters group on the Bill Payment Processing page. If value is false, a new group of filters, named Custom Transaction Filters, is added to the Bill Payment Processing page.
         *
         * reference {string} [required] – The internal ID name of the field you want to add as a filter. Note that you can only add fields from the transaction record. If you want to source a newly created transaction body field or transaction column field, the reference argument must be the id of the newly created field.
         *
         * type {string} [required] – The field type of the filter. Valid arguments are listed below:
         *     text
         *     date
         *     checkbox
         *     select
         *     multiselect
         *     integer
         *     currency
         *     longtext
         *
         * label {string} [required] – The label of the filter displayed on the Bill Payment Processing page.
         *
         * displayType {string} [optional] – The display type of the filter on the Bill Payment Processing page. Accepted values are listed below:
         *     inline
         *     normal
         *     hidden
         *     disabled
         *
         * defaultValue {string} [optional] – The default value of the filter that is displayed automatically when the Bill Payment Processing page loads.
         *
         * helpText {string} [optional] – The text displayed when the filter label is clicked. The helpText value describes the data searched for when the filter is used.
         *
         * source {string} [optional] – Specifies the source where the filter gets its autopopulated values. An example value is the internal id of a list or record. Note that source must have a value if the type argument is select or multiselect, for the values of the filter to be displayed.
         *
         * maxLength {string} [optional] – A whole number that defines the allowed length of the value entered on the filter.
         *
         * @throws {EP_API_INVALID_FILTERTYPE_VALUE} – Thrown when filter type has invalid values added. Refer to the valid filter type values.
         * @throws {EP_API_INVALID_FILTERDISPLAYTYPE_VALUE} – Thrown when displayType value is invalid. Refer to the valid displayType filter values.
         * @throws {EP_API_MISSING_FILTER_FIELDS} – Thrown when a required argument is missing [isDefaultFilter, reference, type, label].
         */
        AddFilter: (...args: AddFilterArgs) => void;
        /**
         * Builds the customized Invoice Payment Processing page. This method must be called after all changes are made.
         * @throws {EP_API_PAYMENTTYPE_MISSING} – Thrown when payment type is not setup.
         * @throws {PBS_FORM_ERROR_INVALIDLICENSEFOREPAPI} –  Thrown when id is not provided.
         */
        BuildUI: () => void;
        /**
         * Removes an existing (default) field from the Payment Information group of the Invoice Payment Processing page.
         *
         * @param id {string} [required] – The field ID of the existing field that you want to remove.
         *
         * @throws {EP_API_REMOVEFIELD} – Thrown when a required field is removed.
         * @throws {EP_API_REMOVEFIELD_INVALID_ID} – Thrown when id is not provided.
         */
        RemoveField: (id: string) => void;
        /**
         * Removes an existing (default) filter from the “Search Filter” group of the Invoice Payment Processing page.
         *
         * @param id {string} [required] – The field id from the “Search Filter” group of the Invoice Payment Processing page that you want to remove. The field id can be found on the helpText of the fields on the “Search Filter” group. You can also refer to the appendix of this document to get the field id of a filter field. The following filters can be removed:
         *     custpage_2663_transtype
         *     custpage_2663_date_from
         *     custpage_2663_date_to
         *     custpage_2663_customer
         *
         * @throws {EP_API_REMOVEFILTER} – Thrown when you are trying to remove a required filter.
         * @throws {EP_API_REMOVEFILTER_INVALID_ID} – Thrown when id is not provided.
         */
        RemoveFilter: (id: string) => void;
    }

    export function getEPForm(): EPForm;
}
