import { loadDefaultJapaneseParser } from 'budoux'
const parser = loadDefaultJapaneseParser()

export const useBudouX = () => {
	const parse = (text: any) => {
		return parser.translateHTMLString(text)
	}
	return {
		parse,
	}
}
