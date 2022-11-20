import Head from 'next/head'
import { ArrowNext } from '@/components/ui/icons/ArrowNext'
import { PaginationLink } from '@/components/ui/pagination/PaginationLink'
import type { PaginationNextProps } from './type'
export const PaginationNext: React.FC<PaginationNextProps> = ({
	current,
	nextUrl,
	totalPages,
}) => {
	return (
		<>
			<Head>
				<link rel="next" href={nextUrl} />
			</Head>
			<PaginationLink
				href={nextUrl}
				aria-label="次のページへ"
				isDisabled={current === totalPages ? true : undefined}
				tabIndex={current === totalPages ? -1 : undefined}
			>
				<ArrowNext />
			</PaginationLink>
		</>
	)
}
