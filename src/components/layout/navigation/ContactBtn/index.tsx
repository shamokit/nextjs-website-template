import { InnerLink } from '@/components/ui/link/InnerLink'

import { ContactBtnProps } from './type'

export const ContactBtn: React.FC<ContactBtnProps> = ({ className }) => {
	return (
		<p className={className}>
			<InnerLink
				href="/contact"
				className="grid place-items-center py-3 px-4 bg-accent-500 text-white rounded"
			>
				Contact
			</InnerLink>
		</p>
	)
}
