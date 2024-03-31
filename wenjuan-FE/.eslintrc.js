module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            version: '18',
        },
    },
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto"
            },
        ],
        "no-unused-vars": 0,
        "@typescript-eslint/no-use-before-define": ["error"],

    },
}
