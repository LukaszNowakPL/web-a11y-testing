module.exports = {
    extends: ['react-app', 'plugin:testing-library/react', 'prettier'],
    plugins: ['@typescript-eslint/eslint-plugin', 'testing-library'],
    rules: {
        'no-console': ['warn', {allow: ['error']}],
        '@typescript-eslint/no-explicit-any': 'error',
    },
    ignorePatterns: ['node_modules', '*.js'],
};
