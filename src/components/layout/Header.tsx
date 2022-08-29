import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { InnerLink } from '../ui/link/InnerLink'
import { Navigation } from './navigation/Navigation'
import { NavigationLayer } from './navigation/BackgroundLayer'
const menu = [
	{
		href: 'about',
		name: 'About',
	},
]
export const Header: React.FC = () => {
	const [open, setOpen] = useState(false)
	const updateOpen = () => setOpen(!open)
	const close = () => setOpen(false)

	return (
		<header className="fixed top-0 left-0 w-full bg-white">
			<Container size="full" className="flex items-center h-[var(--header--height)]">
				<p className="flex-grow-0 font-bold text-xl">
					<InnerLink href={'/'} className="animation-alpha">
						Logo
					</InnerLink>
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
