import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks"; // Import react-hooks plugin
import babelParser from "@babel/eslint-parser"; // Import Babel parser

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: babelParser, // Use the Babel parser to understand JSX
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks, // Add react-hooks plugin
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      // Define the rules for react-hooks with severity
      "react-hooks/rules-of-hooks": "error", // Enforces the rules of hooks
      "react-hooks/exhaustive-deps": "warn", // Warns on missing dependencies in useEffect
    },
    settings: {
      react: {
        version: "18",
      },
    },
  },
];
