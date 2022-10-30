import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import '@/styles/globals.css'

import { WebPage, Organization } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

import { SITE_URL, COMPANY_NAME } from '@/libs/const'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<script
					{...jsonLdScriptProps<WebPage>({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						hasPart: [
							{
								'@type': 'SiteNavigationElement',
								hasPart: [
									{
										'@type': 'WebPage',
										name: 'Home',
										url: `${SITE_URL}`,
									},
									{
										'@type': 'AboutPage',
										name: 'About',
										url: `${SITE_URL}/about/`,
									},
									{
										'@type': 'ContactPage',
										name: 'Contact',
										url: `${SITE_URL}/contact/`,
									},
								],
							},
						],
					})}
				/>
				<script
					{...jsonLdScriptProps<Organization>({
						'@context': 'https://schema.org',
						'@type': 'Organization',
						name: `${COMPANY_NAME}`,
						url: `${SITE_URL}`,
						logo: '/logo.svg',
					})}
				/>
			</Head>
			<DefaultSeo {...SEO} />
			<div className="flex flex-col min-h-screen pt-[var(--header--height)]">
				<Header />
				<div className="flex-grow">
					<Component {...pageProps} />
				</div>
				<Footer />
			</div>
		</>
	)
}

export default MyApp
