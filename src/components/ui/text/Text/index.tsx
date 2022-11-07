import { memo } from 'react'
import { useBudouX } from '@/components/lib/useBudouX'
import type { TextProps } from './type'
export const Text = memo(
	<E extends React.ElementType = 'span'>({ as, text }: TextProps<E>) => {
		const { parse } = useBudouX()
		const Tag = as || 'span'
		return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }} />
	}
)
