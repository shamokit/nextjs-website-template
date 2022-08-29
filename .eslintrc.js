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
		"react/react-in-jsx-scope": "off",
	},
	"overrides": [
		{
			"files": ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
			"rules": {
				"storybook/hierarchy-separator": "error",
				"storybook/default-exports": "off"
			}
		}
	]
}
