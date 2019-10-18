module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      'prettier/@typescript-eslint',
      "plugin:prettier/recommended"
    ],
    "globals": {},
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ]
};
