declare module "N/transaction" {
    interface VoidOptions {
        id: number | string;
        type: string | Type;
    }

    interface TransactionVoidFunction {
        (options: VoidOptions): number;
        promise(options: VoidOptions): Promise<number>;
    }

    const voidFunc: TransactionVoidFunction;
    export { voidFunc as void };

    export enum Type { // As of 15 July 2020
        ASSEMBLY_BUILD,
        ASSEMBLY_UNBUILD,
        BIN_TRANSFER,
        BIN_WORKSHEET,
        BLANKET_PURCHASE_ORDER,
        CASH_REFUND,
        CASH_SALE,
        CHECK,
        CREDIT_CARD_CHARGE,
        CREDIT_CARD_REFUND,
        CREDIT_MEMO,
        CUSTOMER_DEPOSIT,
        CUSTOMER_PAYMENT,
        CUSTOMER_PAYMENT_AUTHORIZATION,
        CUSTOMER_REFUND,
        CUSTOM_TRANSACTION,
        DEPOSIT,
        DEPOSIT_APPLICATION,
        ESTIMATE,
        EXPENSE_REPORT,
        FULFILLMENT_REQUEST,
        INBOUND_SHIPMENT,
        INVENTORY_ADJUSTMENT,
        INVENTORY_COST_REVALUATION,
        INVENTORY_COUNT,
        INVENTORY_STATUS_CHANGE,
        INVENTORY_TRANSFER,
        INVOICE,
        ITEM_FULFILLMENT,
        ITEM_RECEIPT,
        JOURNAL_ENTRY,
        OPPORTUNITY,
        PAYCHECK,
        PAYCHECK_JOURNAL,
        PERIOD_END_JOURNAL,
        PURCHASE_CONTRACT,
        PURCHASE_ORDER,
        PURCHASE_REQUISITION,
        RETURN_AUTHORIZATION,
        REVENUE_ARRANGEMENT,
        REVENUE_COMMITMENT,
        REVENUE_COMMITMENT_REVERSAL,
        SALES_ORDER,
        STORE_PICKUP_FULFILLMENT,
        TRANSFER_ORDER,
        VENDOR_BILL,
        VENDOR_CREDIT,
        VENDOR_PAYMENT,
        VENDOR_PREPAYMENT,
        VENDOR_PREPAYMENT_APPLICATION,
        VENDOR_RETURN_AUTHORIZATION,
        WAVE,
        WORK_ORDER,
        WORK_ORDER_CLOSE,
        WORK_ORDER_COMPLETION,
        WORK_ORDER_ISSUE,
    }
}
