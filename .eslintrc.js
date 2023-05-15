module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"plugin:react/jsx-runtime",
	],
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
			plugins: ["@typescript-eslint"],
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"prettier",
			],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": "off",
				"@typescript-eslint/no-explicit-any": "off",
			},
		},
		{
			files: ["*.js", "*.jsx"],
			parser: "babel-eslint",
			plugins: ["babel"],
			rules: {
				"babel/no-unused-expressions": "error",
				"babel/semi": "error",
			},
		},
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"no-unused-vars": "error",
		camelcase: "error",
	},
};
