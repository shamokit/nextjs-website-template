import classnames from 'classnames'
import { InnerLink } from '@/components/ui/link/InnerLink'
import { ContactBtn } from '@/components/layout/navigation/ContactBtn/index'

type Menu = {
	href: string
	name: string
	children?: Menu[]
}[]
type NavigationProps = {
	menu: Menu
	className: string
}
export const Navigation: React.FC<NavigationProps> = ({ menu, className }) => (
	<>
		<nav
			id="navigation"
			itemProp="hasPart"
			itemType="http://www.schema.org/SiteNavigationElement"
			className={classnames([className])}
		>
			<div className="lg:flex lg:items-center">
				<ul className="lg:flex lg:-mr-10 font-bold">
					<li
						itemProp="hasPart"
						itemScope
						itemType="http://schema.org/WebPage"
						className="mr-10"
					>
						<InnerLink href={'/'}>TOP</InnerLink>
					</li>
					{menu &&
						menu.map((item) => {
							return (
								<li
									itemProp="hasPart"
									itemScope
									itemType="http://schema.org/WebPage"
									key={item.href}
									className="mr-10"
								>
									<InnerLink href={item.href}>{item.name}</InnerLink>
								</li>
							)
						})}
				</ul>
				<div className="ml-10">
					<ContactBtn>Contact</ContactBtn>
				</div>
			</div>
		</nav>
	</>
)
