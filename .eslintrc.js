module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["check-file"],
  rules: {
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{jsx,tsx}": "CAMEL_CASE",
        "**/*.{js,ts}": "CAMEL_CASE",
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        "src/**/": "CAMEL_CASE",
        "mocks/*/": "KEBAB_CASE",
      },
    ],
  },
};
