module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "webextensions": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-unused-vars": [1],
        "@typescript-eslint/no-explicit-any": [1],
        '@typescript-eslint/no-var-requires': 'off',
        "semi": [2, "always"],
        "indent": [2, 2],
        "require-jsdoc": [1, {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": false,
                "ClassDeclaration": false,
                "ArrowFunctionExpression": true,
                "FunctionExpression": true,
            }
        }]
    },
    "ignorePatterns": [".eslintrc.js", "build/*", "dist/*"]
}
