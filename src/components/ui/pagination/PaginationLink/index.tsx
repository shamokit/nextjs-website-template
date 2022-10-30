import { InnerLink } from '@/components/ui/link/InnerLink'
import type { PaginationLinkProps } from './type'
export const PaginationLink: React.FC<PaginationLinkProps> = ({
	children,
	current,
	isDisabled,
	...restProps
}) => {
	return (
		<InnerLink
			aria-disabled={isDisabled ? 'true' : undefined}
			aria-label={
				current ? `現在のページ（${children}ページ目）` : `${children}ページ目へ`
			}
			tabIndex={current ? -1 : undefined}
			className={[
				'grid place-items-center min-w-[2.75rem] h-11 px-2 border border-primary-500',
				isDisabled
					? 'pointer-events-none'
					: 'transition-colors hover:bg-primary-500 hover:text-white',
				current ? 'pointer-events-none bg-primary-500 text-white' : '',
			].join(' ')}
			{...restProps}
		>
			{children}
		</InnerLink>
	)
}
