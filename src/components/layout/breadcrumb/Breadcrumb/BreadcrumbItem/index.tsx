import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { InnerLink } from '@/components/ui/link/InnerLink'

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
	title,
	path,
	separator,
	isLink = true,
	current = false,
}) => {
	return (
		<li className="flex mr-2">
			{separator ? (
				<span aria-hidden={true} className="flex-grow-0 flex-shrink-0 mr-2 font-normal">
					{separator}
				</span>
			) : null}
			{isLink ? (
				<InnerLink href={path} aria-current={!current ? 'location' : undefined}>
					{title}
				</InnerLink>
			) : (
				<span>{title}</span>
			)}
		</li>
	)
}
