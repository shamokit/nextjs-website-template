import { InnerLink } from '@/components/ui/link/InnerLink'
import { ContactBtn } from '@/components/layout/navigation/ContactBtn/index'
import type { NavigationProps } from './type'
export const Navigation: React.FC<NavigationProps> = ({ menu, className }) => (
	<>
		<nav id="navigation" className={className}>
			<div className="lg:flex lg:items-center">
				<ul
					className="lg:flex lg:-mr-10 font-bold"
					role="navigation"
					aria-label="メインナビゲーション"
				>
					<li className="mr-10">
						<InnerLink href={'/'}>TOP</InnerLink>
					</li>
					{menu &&
						menu.map((item) => {
							return (
								<li key={item.href} className="mr-10">
									<InnerLink href={`${item.href}`}>{item.name}</InnerLink>
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
