import type { AppProps } from 'next/app'
import Head from 'next/head'

import { DefaultSeo } from '@/libs/next-seo'
import { GoogleAnalytics } from '@/libs/nextjs-google-analytics'
import { jsonLdScriptProps } from '@/libs/react-schemaorg'
import { Organization, WebPage } from '@/libs/schema-dts'

import { COMPANY_NAME, COMPANY_TEL, SITE_URL } from '@/utils/meta'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { SVG } from '@/components/ui/svg'

import '@/styles/globals.css'

import SEO from '../../next-seo.config'

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
						name: COMPANY_NAME,
						url: SITE_URL,
						logo: '/logo.svg',
						telephone: COMPANY_TEL,
					})}
				/>
			</Head>
			<GoogleAnalytics trackPageViews />
			<SVG />
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
