import { COMPANY_NAME } from '@/utils/meta'

import { Container } from '@/components/layout/container/Container'

export const Footer: React.FC = () => {
	const SITE_RELEASE_YEAR = 2022
	const currentTime = new Date()
	const year = currentTime.getFullYear()
	return (
		<footer
			itemScope
			itemType="https://schema.org/WPFooter"
			className="bg-primary-500 text-white py-10"
		>
			<Container size="full">
				<h2 className="sr-only">フッターメニュー</h2>
				<p className="text-center">
					<small>{`@ ${
						SITE_RELEASE_YEAR === year ? year : `${year} - ${SITE_RELEASE_YEAR}`
					} ${COMPANY_NAME} Inc.`}</small>
				</p>
			</Container>
		</footer>
	)
}
