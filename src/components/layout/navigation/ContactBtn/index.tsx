import { InnerLink } from '@/components/ui/link/InnerLink'

type ContactBtnProps = {
	children: React.ReactNode
}
export const ContactBtn: React.FC<ContactBtnProps> = ({ children }) => {
	return (
		<p>
			<InnerLink
				href="/contact"
				className="grid place-items-center px-4 py-3 bg-accent-500 text-white rounded"
			>
				{children}
			</InnerLink>
		</p>
	)
}
