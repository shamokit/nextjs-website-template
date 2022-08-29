module.exports = {
	"plugins": {
		"postcss-import": {},
		"tailwindcss/nesting": {},
		"tailwindcss": {},
		"autoprefixer": {},
		"postcss-flexbugs-fixes": {},
		"postcss-easings": {},
		"postcss-at-rules-variables": {},
		"postcss-custom-properties": {},
		"postcss-simple-vars": {},
		"postcss-mixins": {},
		"postcss-nested": {},
		"postcss-preset-env": {
			"autoprefixer": {
				"flexbox": "no-2009"
			},
			"stage": 2,
			"features": {
				"custom-properties": true
			}
		}
	}
}
