module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
    },
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": ['@typescript-eslint', 'check-file'], // Use @typescript-eslint for TypeScript
    "rules": {
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.{jsx,tsx}': 'CAMEL_CASE',
                '**/*.{js,ts}': 'CAMEL_CASE'
            }
        ],
        'check-file/folder-naming-convention': [
            'error',
            {
                'handler/**/': 'CAMEL_CASE',
                'logger/*/': 'KEBAB_CASE'
            }
        ]
    }
}
