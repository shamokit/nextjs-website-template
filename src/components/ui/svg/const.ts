export const icons = {
	arrowFirst: {
		viewBox: '0 0 24 24',
		paths: '<path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z" />',
	},
	arrowLast: {
		viewBox: '0 0 24 24',
		paths: '<path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z" />',
	},
	arrowNext: {
		viewBox: '0 0 24 24',
		paths: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />',
	},
	arrowPrev: {
		viewBox: '0 0 24 24',
		paths: '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />',
	},
} as const
export const iconNames = Object.keys(icons) as (keyof typeof icons)[]
