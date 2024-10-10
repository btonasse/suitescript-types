declare module "N/sso" {
    interface GenerateSuiteSignOnTokenOptions {
        suiteSignOnId: string;
    }

    export function generateSuiteSignOnToken(options: GenerateSuiteSignOnTokenOptions): string;
}
