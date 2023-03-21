module.exports =
{
	"env": {
		"es6": true,
	},
	"extends": [
		"eslint:recommended",
		"plugin:storybook/recommended",
		"plugin:@typescript-eslint/recommended",
		"next",
		"next/core-web-vitals",
		"prettier"
	],
	"rules": {
		"@next/next/no-img-element": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-no-useless-fragment": ['error'],
		"react/jsx-no-leaked-render": ['error'],
	},
	"overrides": [
		{
			"files": ["*.stories.@(ts|tsx)"],
			"rules": {
				"storybook/hierarchy-separator": "error",
				"storybook/default-exports": "off"
			}
		}
	]
}
