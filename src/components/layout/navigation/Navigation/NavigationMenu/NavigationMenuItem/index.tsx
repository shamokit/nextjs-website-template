import { NavigationMenuChild } from '@/components/layout/navigation/Navigation/NavigationMenu/NavigationMenuChild'
import { InnerLink } from '@/components/ui/link/InnerLink'

import type { NavigationMenuItemProps } from './type'

export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ menuItem }) => {
	return menuItem.children ? (
		<NavigationMenuChild menuItem={menuItem} />
	) : (
		<InnerLink href={menuItem.href} className="block p-4 md:p-3 border-b md:border-0">
			{menuItem.name}
		</InnerLink>
	)
}
