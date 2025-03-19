const eslint = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["node_modules", "dist", "**/*.test.ts"],
  },
  {
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  configPrettier,
];
