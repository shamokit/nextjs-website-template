import { budouxParser } from '@/libs/budoux'
export const useBudouX = () => {
	const parse = (text: string) => budouxParser.translateHTMLString(text)
	return {
		parse,
	}
}
