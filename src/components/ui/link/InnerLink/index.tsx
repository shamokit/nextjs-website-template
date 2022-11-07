import NextLink from 'next/link'
import type { InnerLinkProps } from './type'
export const InnerLink: React.FC<InnerLinkProps> = ({
	href,
	className,
	children,
	...restProps
}) => (
	<NextLink href={href}>
		<a className={className} {...restProps}>
			{children}
		</a>
	</NextLink>
)
