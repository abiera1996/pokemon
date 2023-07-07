module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        camelcase: [
            'error',
            { properties: 'never', ignoreDestructuring: true },
        ],
        'import/no-named-as-default': 0,
        'react/prop-types': 'off',
    },
};
