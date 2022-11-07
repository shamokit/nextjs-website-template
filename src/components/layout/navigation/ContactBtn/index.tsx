import { InnerLink } from '@/components/ui/link/InnerLink'
import { ContactBtnProps } from './type'
export const ContactBtn: React.FC<ContactBtnProps> = ({ className, children }) => {
	return (
		<p className={className}>
			<InnerLink
				href="/contact"
				className="grid place-items-center px-4 py-3 bg-accent-500 text-white rounded"
			>
				{children}
			</InnerLink>
		</p>
	)
}
