module.exports =
{
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
	},
	"es6": true,
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
