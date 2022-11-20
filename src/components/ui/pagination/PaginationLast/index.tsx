import { ArrowLast } from '@/components/ui/icons/ArrowLast'
import { PaginationLink } from '@/components/ui/pagination/PaginationLink'
import type { PaginationLastProps } from './type'
export const PaginationLast: React.FC<PaginationLastProps> = ({
	current,
	fullArchiveUrl,
	totalPages,
}) => {
	return (
		<PaginationLink
			href={`${fullArchiveUrl}pages/${totalPages}/`}
			aria-label="最後のページへ"
			isDisabled={current === totalPages ? true : undefined}
			tabIndex={current === totalPages ? -1 : undefined}
		>
			<ArrowLast />
		</PaginationLink>
	)
}
