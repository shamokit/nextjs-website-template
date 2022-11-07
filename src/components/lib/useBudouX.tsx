import { budouxParser } from '@/libs/budoux'
export const useBudouX = () => {
	const parse = (text: string) => {
		return budouxParser.translateHTMLString(text)
	}
	return {
		parse,
	}
}
