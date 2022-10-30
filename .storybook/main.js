const path = require('path')
module.exports = {
	"staticDirs": ['../public'],
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(ts|tsx)"
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
					"@/api": path.resolve(__dirname, "../src/api"),
					"@/components": path.resolve(__dirname, "../src/components"),
					"@/libs": path.resolve(__dirname, "../src/libs"),
					"@/pages": path.resolve(__dirname, "../src/pages"),
					"@/styles": path.resolve(__dirname, "../src/styles"),
					"@/utils": path.resolve(__dirname, "../src/utils"),
				},
			},
		};
	},
}
