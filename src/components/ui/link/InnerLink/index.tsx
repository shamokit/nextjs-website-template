import NextLink, { LinkProps as NextLinkProps } from 'next/link'
export type InnerLinkProps = React.PropsWithChildren<NextLinkProps> & {
	className?: string
}
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
