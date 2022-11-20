import { Container } from '@/components/layout/container/Container'
import { COMPANY_NAME, SITE_RELEASE_YEAR } from '@/utils/const'
export const Footer: React.FC = () => {
	const currentTime = new Date()
	const year = currentTime.getFullYear()
	return (
		<footer
			className="bg-primary-500 text-white py-10"
			itemScope
			itemType="https://schema.org/WPFooter"
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
