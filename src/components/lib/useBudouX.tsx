import { loadDefaultJapaneseParser } from 'budoux'
const parser = loadDefaultJapaneseParser()

export const useBudouX = () => {
	const parse = (text: string) => {
		return parser.translateHTMLString(text)
	}
	return {
		parse,
	}
}
