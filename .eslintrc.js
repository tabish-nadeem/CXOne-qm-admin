module.exports = {
    "extends": [
        "eslint-config-cxone"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.eslint.json",
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "rules": {
                //insert rules here
            }
        },
        {
            "files": ["*.js"],
            "rules": {
                //insert rules here
            }
        }
    ]
};
