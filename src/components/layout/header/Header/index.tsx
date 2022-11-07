import { useState } from 'react'
import { Container } from '@/components/layout/container/Container'
import { InnerLink } from '@/components/ui/link/InnerLink'
import { Navigation } from '@/components/layout/navigation/Navigation/index'
import { NavigationLayer } from '@/components/layout/navigation/BackgroundLayer'
const menu = [
	{
		href: '/about',
		name: 'About',
	},
]
export const Header: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false)
	const updateOpen = () => setOpen((prevOpen) => !prevOpen)
	const close = () => setOpen(false)

	return (
		<header
			className="fixed top-0 left-0 w-full bg-white"
			itemScope
			itemType="http://schema.org/WPHeader"
		>
			<Container size="full" className="flex items-center h-[var(--header--height)]">
				<p className="flex-grow-0 font-bold text-xl">
					<InnerLink href={'/'}>Logo</InnerLink>
				</p>
				<Navigation menu={menu} className="ml-auto" />
				<button onClick={updateOpen} className="md:hidden">
					{open ? 'Menu' : 'Close'}
				</button>
			</Container>

			<NavigationLayer open={open} close={close} />
		</header>
	)
}
