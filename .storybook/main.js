const path = require('path')
module.exports = {
	"staticDirs": ['../public'],
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-viewport",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"storybook-addon-next-router"
	],
	"framework": "@storybook/react",
	"core": {
		"builder": "@storybook/builder-webpack5"
	},
	webpackFinal: async (config) => {
		return {
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					"@/public": path.resolve(__dirname, "../public"),
					"@/components": path.resolve(__dirname, "../src/components"),
					"@/lib": path.resolve(__dirname, "../src/lib"),
					"@/utils": path.resolve(__dirname, "../src/utils"),
					"@/pages": path.resolve(__dirname, "../src/pages"),
					"@/styles": path.resolve(__dirname, "../src/styles"),
				},
			},
		};
	},
}
