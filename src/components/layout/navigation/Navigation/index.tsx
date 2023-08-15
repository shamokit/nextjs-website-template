"use client";
import { useEffect, useState } from 'react'

import { BREAK_POINTS } from '@/utils/const'
import { useWindowSize } from '@/utils/useWindowSize'

import { ContactBtn } from '@/components/layout/navigation/ContactBtn'
import { NavigationButton } from '@/components/layout/navigation/Navigation/NavigationButton'
import { NavigationMenu } from '@/components/layout/navigation/Navigation/NavigationMenu'

const menu = [
	{
		href: '/',
		name: 'Home',
	},
	{
		href: '/about',
		name: 'About',
		children: [
			{
				href: '/about/recruit',
				name: 'Recruit',
			},
		],
	},
]
export const Navigation: React.FC = () => {
	const [open, setOpen] = useState(false)
	const windowSize = useWindowSize()
	const idForAria = 'nav'
	useEffect(() => {
		if (windowSize >= BREAK_POINTS.md) {
			setOpen(true)
		}
	}, [windowSize])
	const animateClass = open
		? 'opacity-100 translate-x-0'
		: 'opacity-0 md:opacity-100 translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto'
	return (
		<>
			<div
				id={idForAria}
				className={`absolute md:static top-0 left-0 w-full h-screen md:h-auto md:ml-auto bg-primary-500 md:bg-transparent transition-all ${animateClass}`}
				aria-hidden={!open}
			>
				<nav
					className="flex md:justify-end gap-4 flex-col md:flex-row md:items-center py-8 px-5"
					aria-label="グローバルメニュー"
				>
					<NavigationMenu menu={menu} />
					<ContactBtn />
				</nav>
			</div>
			<NavigationButton
				idForAria={idForAria}
				open={open}
				onClick={() => setOpen((prevState) => !prevState)}
			/>
		</>
	)
}
