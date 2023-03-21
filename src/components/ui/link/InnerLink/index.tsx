import NextLink from 'next/link'

import type { InnerLinkProps } from './type'

export const InnerLink: React.FC<InnerLinkProps> = ({
	href,
	className,
	children,
	...restProps
}) => (
	<NextLink href={href} className={className} {...restProps}>
		{children}
	</NextLink>
)
