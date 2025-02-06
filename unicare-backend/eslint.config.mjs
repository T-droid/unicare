import globals from "globals";

import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    {
        files: ["**/**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
                parser: tsParser,
                parserOptions: {
                        ecmaVersion: "latest",
                        sourceType: "module",
                },
                globals: {
                    ...globals.browser,
                    ...globals.node,
                },
        },
        plugins: {
            "@typescript-eslint": tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            semi: ["error", "always"],
            quotes: ["error", "double"],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-inferrable-types": [
                "warn",
                {
                    ignoreParameters: true,
                },
            ],
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
    prettier,
];
