import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import '@/styles/globals.css'

import { WebPage, Organization } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MediaQuery } from '@/components/ui/mediaQuery'

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
										url: 'https://example.com',
									},
									{
										'@type': 'AboutPage',
										name: 'About',
										url: 'https://example.com/about/',
									},
									{
										'@type': 'FAQPage',
										name: 'Faq',
										url: 'https://example.com/faq/',
										mainEntity: [
											{
												'@type': 'Question',
												name: 'よくある質問1',
												acceptedAnswer: {
													'@type': 'Answer',
													text: '<p>回答が入ります。</p>',
												},
											},
										],
									},
									{
										'@type': 'ContactPage',
										name: 'Contact',
										url: 'https://example.com/contact/',
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
						name: '会社名',
						url: '/vercel.svg',
						logo: 'https://example.com',
					})}
				/>
			</Head>
			<div className="flex flex-col min-h-screen pt-[var(--header--height)]">
				<DefaultSeo {...SEO} />
				<MediaQuery />
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
