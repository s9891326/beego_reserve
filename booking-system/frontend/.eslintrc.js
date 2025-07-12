module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier', // 👈 確保 Prettier 與 ESLint 不衝突
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'import'],
    rules: {
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin', // React, fs, path...
                    'external', // axios, lodash, react-select...
                    'internal', // @/components, ~/utils, ...
                    ['parent', 'sibling', 'index'],
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always', // 👈 會在分組之間加入空行
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
