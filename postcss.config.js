module.exports = {
	"plugins": {
		"postcss-import": {},
		"tailwindcss/nesting": {},
		"tailwindcss": {},
		"autoprefixer": {},
		"postcss-flexbugs-fixes": {},
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
