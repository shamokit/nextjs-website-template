import type { NextPage } from 'next'

import { Main } from './components/Main'
import { Mv } from './components/Mv'

const Page: NextPage = () => {
	return (
		<>
			<Mv />
			<Main />
		</>
	)
}
export default Page
