import type { NextPage } from 'next'

import { NextSeo } from '@/libs/next-seo'

import { PageHome } from '@/components/pages/home'

const Home: NextPage = () => {
	return (
		<>
			<NextSeo />
			<PageHome />
		</>
	)
}
export default Home
