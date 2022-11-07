import type { LinkProps as NextLinkProps } from 'next/link'
export type InnerLinkProps = React.PropsWithChildren<NextLinkProps> & {
	className?: string
}
