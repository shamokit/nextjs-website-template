import { COMPANY_NAME } from '@/lib/const'
import { Container } from '@/components/layout/Container'
export const Footer: React.FC = () => {
	const currentTime = new Date()
	const year = currentTime.getFullYear()
	const releaseYear = 2022

	return (
		<footer className="bg-primary-500 text-white py-10">
			<Container size="full">
				<p className="text-center">
					<small>
						@ {releaseYear === year ? year : `${releaseYear}-${year}`} {COMPANY_NAME} Inc.
					</small>
				</p>
			</Container>
		</footer>
	)
}
