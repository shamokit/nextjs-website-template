import { InnerLink } from '@/components/ui/link/InnerLink/index'
import type { BreadcrumbItemProps } from '@/components/ui/breadcrumb/BreadcrumbItem/type'
export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
	title,
	path,
	separator,
	isLink = true,
}) => {
	return (
		<>
			<li className="flex mr-4xs">
				{separator && (
					<span aria-hidden={true} className="flex-grow-0 flex-shrink-0 mr-4xs">
						{separator}
					</span>
				)}
				{isLink ? <InnerLink href={path}>{title}</InnerLink> : <span>{title}</span>}
			</li>
		</>
	)
}
