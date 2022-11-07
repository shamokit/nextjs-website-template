import type { BlankLinkProps } from './type'
export const BlankLink: React.FC<BlankLinkProps> = ({ href, children }) => (
	<a href={href} target="_blank" rel="noopener noreferrer">
		{children}
		<span className="sr-only">外部サイトにリンクします</span>
	</a>
)
