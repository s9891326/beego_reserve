module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['simple-import-sort'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',  // 放最後
    ],
    rules: {
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
