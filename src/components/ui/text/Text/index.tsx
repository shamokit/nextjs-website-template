import { useBudouX } from '@/components/lib/useBudouX'
type TextProps = {
	as?: 'div' | "h1" | "p"
	text: string
}
export const Text = ({ as = 'div', text }: TextProps) => {
	const { parse } = useBudouX()
	const Tag = as
	return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }} />
}
