// eslint.config.js
export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        },
        extends: "plugin:wc/recommended",
        plugins: [
            "html",
        ],
    }
];
