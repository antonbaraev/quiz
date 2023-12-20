module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'fbjs',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        indent: ['error', 4],
        'max-len': ["error", { "code": 120 }],
    },
};
