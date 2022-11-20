import { NavigationMenuItem } from '@/components/layout/navigation/Navigation/NavigationMenu/NavigationMenuItem'
import type { NavigationMenuProps } from './type'
export const NavigationMenu: React.FC<NavigationMenuProps> = ({ menu }) => {
	if (!menu) return null
	return (
		<ul className="md:flex md:-mr-6 font-bold text-white md:text-primary-500">
			{menu.map((menuItem) => {
				return (
					<li key={menuItem.href} className="relative md:mr-6">
						<NavigationMenuItem menuItem={menuItem} />
					</li>
				)
			})}
		</ul>
	)
}
