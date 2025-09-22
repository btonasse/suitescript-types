interface LogOptions {
    /** String to appear in the Title column on the Execution Log tab of the script deployment. Maximum length is 99 characters. */
    title: string;
    /**
     * You can pass any value for this parameter.
     * If the value is a JavaScript object type, JSON.stringify(obj) is called on the object before displaying the value.
     * NetSuite truncates any resulting string over 3999 characters.
     */
    details?: any;
}

export function debug(title: string, details: any): void;
export function debug(options: LogOptions): void;

export function audit(title: string, details: any): void;
export function audit(options: LogOptions): void;

export function error(title: string, details: any): void;
export function error(options: LogOptions): void;

export function emergency(title: string, details: any): void;
export function emergency(options: LogOptions): void;
