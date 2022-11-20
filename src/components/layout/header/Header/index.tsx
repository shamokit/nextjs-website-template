import { InnerLink } from '@/components/ui/link/InnerLink'
import { Container } from '@/components/layout/container/Container'
import { Navigation } from '@/components/layout/navigation/Navigation'
export const Header: React.FC = () => {
	return (
		<header
			className="fixed top-0 left-0 w-full bg-white"
			itemScope
			itemType="https://schema.org/WPHeader"
		>
			<Container size="full" className="flex items-center h-[var(--header--height)]">
				<h1 className="flex-grow-0 font-bold text-xl">
					<InnerLink href={'/'}>Logo</InnerLink>
				</h1>
				<Navigation />
			</Container>
		</header>
	)
}
