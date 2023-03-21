import { Accordion } from '@/components/ui/accordion/Accordion'
import { InnerLink } from '@/components/ui/link/InnerLink'

import type { NavigationMenuChildProps } from './type'

export const NavigationMenuChild: React.FC<NavigationMenuChildProps> = ({ menuItem }) => {
	if (!menuItem.children) return null
	return (
		<Accordion
			className="block"
			title={
				<span className="block p-4 md:p-3 border-b md:border-0">{menuItem.name}</span>
			}
		>
			<ul className="md:absolute top-full p-4 md:px-6 bg-white md:bg-primary-500 text-primary-500 md:text-white">
				{menuItem.children.map((child) => {
					return (
						<li key={child.href}>
							<InnerLink href={child.href} className="relative block py-2 px-4">
								<span className="absolute top-4 md:top-3.5 left-0 w-1.5 h-1.5 rounded-full bg-primary-500 md:bg-white"></span>
								{child.name}
							</InnerLink>
						</li>
					)
				})}
			</ul>
		</Accordion>
	)
}
