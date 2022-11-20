import { ArrowFirst } from '@/components/ui/icons/ArrowFirst'
import { PaginationLink } from '@/components/ui/pagination/PaginationLink'
import type { PaginationFirstProps } from './type'
export const PaginationFirst: React.FC<PaginationFirstProps> = ({
	fullArchiveUrl,
	current,
}) => {
	return (
		<PaginationLink
			href={fullArchiveUrl}
			aria-label="最初のページへ"
			isDisabled={current === 1 ? true : undefined}
			tabIndex={current === 1 ? -1 : undefined}
		>
			<ArrowFirst />
		</PaginationLink>
	)
}
