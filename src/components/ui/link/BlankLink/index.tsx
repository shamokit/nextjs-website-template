export type BlankLinkProps = {
	children: React.ReactNode
} & React.DetailedHTMLProps<
	React.AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>
export const BlankLink: React.FC<BlankLinkProps> = ({ href, children }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		{children}
		<span className="sr-only">外部サイトにリンクします</span>
	</a>
)
