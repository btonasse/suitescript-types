import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            only: true,
            tsconfig: "./tests/tsconfig.json",
        },
        name: "SuiteScript Types",
    },
});
