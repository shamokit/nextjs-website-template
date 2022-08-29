import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Container } from '@/components/layout/Container'
import { SimpleMainVisual } from '@/components/layout/mainVisual/SimpleMainVisual/index'
import { Text } from '@/components/ui/text/Text'

const Home: NextPage = () => {
	return (
		<>
			<NextSeo />
			<SimpleMainVisual
				title={'TOP<br>test'}
				copy={'この記事は、Shamokitのブログ記事の本文です。この記事は、Shamokitのブログ記事の本文です。'}
				image={{
					sm: 'https://placehold.jp/3d4070/ffffff/600x400.png',
					md: 'https://placehold.jp/1240x600.png',
					width: 1240,
					height: 600,
					loading: false,
				}}
			/>
			<Container>
				<main>
					<Text text={`この記事は、Shamokitのブログ記事の本文です。<br />この記事は、Shamokitのブログ記事の本文です。`} />
				</main>
			</Container>
		</>
	)
}

export default Home
