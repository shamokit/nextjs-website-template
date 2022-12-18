/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"src/**/*.{ts,tsx}",
	],
	theme: {
		screens: {
			'sm': '600px',
			'md': '768px',
			'lg': '1100px',
			'xl': '1280px',
			'xxl': '1536px',
		},
		container: {
			center: true,
			padding: 'var(--contents--padding--side)',
		},
		fontFamily: {
			'noto': ["Noto Sans JP", "ヒラギノ角ゴ ProN W3", "Meiryo", "sans-serif"]
		},
		fontWeight: {
			normal: 400,
			medium: 500,
			bold: 700
		},
		lineHeight: {
			'none': '1',
			'xs': '1.1',
			'sm': '1.6',
			'md': '1.8',
			'lg': '2',
		},
		colors: {
			'current': 'currentColor',
			'transparent': 'transparent',
			'white': 'rgb(var(--color--white), <alpha-value>)',
			'primary-500': 'rgb(var(--color--primary-500), <alpha-value>)',
			'accent-500': 'rgb(var(--color--accent-500), <alpha-value>)',
			'surface-100': 'rgb(var(--color--surface-100), <alpha-value>)',
			'surface-500': 'rgb(var(--color--surface-500), <alpha-value>)',
			'surface-600': 'rgb(var(--color--surface-600), <alpha-value>)',
		},
		letterSpacing: {
			'sm': "var(--letter-spacing--sm)",
			'md': 'var(--letter-spacing--md)',
			'lg': 'var(--letter-spacing--lg)',
		},
		fontSize: {
			'2xs': ['var(--font-size--2xs)', {
				lineHeight: 'var(--line-height--sm)'
			}],
			'xs': ['var(--font-size--xs)', {
				lineHeight: 'var(--line-height--sm)'
			}],
			'sm': 'var(--font-size--sm)',
			'md': 'var(--font-size--md)',
			'lg': 'var(--font-size--lg)',
			'xl': ['var(--font-size--xl)', {
				lineHeight: 'var(--line-height--sm)'
			}],
			'2xl': ['var(--font-size--2xl)', {
				lineHeight: 'var(--line-height--sm)'
			}],
			'3xl': ['var(--font-size--3xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'4xl': ['var(--font-size--4xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'5xl': ['var(--font-size--5xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'6xl': ['var(--font-size--6xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'7xl': ['var(--font-size--7xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'8xl': ['var(--font-size--8xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'9xl': ['var(--font-size--9xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'10xl': ['var(--font-size--10xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'11xl': ['var(--font-size--11xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'12xl': ['var(--font-size--12xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'13xl': ['var(--font-size--13xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'14xl': ['var(--font-size--14xl)', {
				lineHeight: 'var(--line-height--xs)'
			}],
			'15xl': ['var(--font-size--15xl)', {
				lineHeight: 'var(--line-height--xs)'
			}]
		}
	}
}
