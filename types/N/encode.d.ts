declare module "N/encode" {
    interface ConvertOptions {
        string: string;
        inputEncoding: Encoding;
        outputEncoding: Encoding;
    }

    export enum Encoding {
        UTF_8,
        BASE_16,
        BASE_32,
        BASE_64,
        BASE_64_URL_SAFE,
        HEX,
    }

    /**
     * Converts a string to another type of encoding and returns the re-encoded string.
     */
    export function convert(options: ConvertOptions): string;
}
