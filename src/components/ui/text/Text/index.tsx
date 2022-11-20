import { useBudouX } from '@/utils/useBudouX'
import type { TextProps } from './type'
export const Text = <E extends React.ElementType = 'span'>({
	as,
	text,
	className,
}: TextProps<E>) => {
	const { parse } = useBudouX()
	const Tag = as || 'span'
	return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }} className={className} />
}
