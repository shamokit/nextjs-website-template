import { InnerLink } from '@/components/ui/link/InnerLink/index'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/BreadcrumbItem/type'
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
	title,
	path,
	separator,
	isLink = true,
	current = false,
}) => {
	return (
		<>
			<li className="flex mr-4xs">
				{separator && (
					<span aria-hidden={true} className="flex-grow-0 flex-shrink-0 mr-4xs font-normal">
						{separator}
					</span>
				)}
				{isLink ? <InnerLink href={path} aria-current={!current ? 'location' : undefined}>{title}</InnerLink> : <span>{title}</span>}
			</li>
		</>
	)
}
