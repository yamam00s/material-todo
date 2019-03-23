module.exports = {
    'extends': [
        "airbnb-base",
        "plugin:prettier/recommended",
    ],
    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    'rules': {
        'indent': ['error', 2],
        "quotes": [2, "single"],
        "single": { "allowTemplateLiterals": true },
        "no-console": "off",
        "prettier/prettier": ["error", { "semi": true, "singleQuote": true }]
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    "globals": {
        "document": true,
        "window": true,
        "location": true
    }

};