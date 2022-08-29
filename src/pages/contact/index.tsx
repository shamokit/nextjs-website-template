import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { PageContact } from '@/components/pages/contact'
const Contact: NextPage = () => (
	<>
		<NextSeo title="Contact" description="Contact Page Description" />
		<main>
			<PageContact />
		</main>
	</>
)

export default Contact
