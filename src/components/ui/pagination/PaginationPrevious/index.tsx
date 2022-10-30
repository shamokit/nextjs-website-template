import Head from 'next/head'
import { ArrowPrev } from '@/components/ui/icons/ArrowPrev'
import { PaginationLink } from '@/components/ui/pagination/PaginationLink/index'
import { PaginationPreviousProps } from './type'
export const PaginationPrevious: React.FC<PaginationPreviousProps> = ({current, previousUrl}) => {
	return (
		<>
			<Head>
				<link rel="prev" href={previousUrl} />
			</Head>
			<PaginationLink
				href={previousUrl}
				aria-label="前のページへ"
				isDisabled={current === 1 ? true : undefined}
				tabIndex={current === 1 ? -1 : undefined}
			>
				<ArrowPrev />
			</PaginationLink>
		</>
	)
}
