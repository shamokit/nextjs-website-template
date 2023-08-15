import { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'

import { jsonLdScriptProps } from '@/libs/react-schemaorg'
import { Organization, WebPage } from '@/libs/schema-dts'

import {
	COMPANY_NAME,
	COMPANY_TEL,
	SITE_DESCRIPTION_DEFAULT,
	SITE_TITLE_DEFAULT,
	SITE_URL,
} from '@/utils/meta'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { Svg } from '@/components/ui/svg'

import '@/styles/globals.css'

import { GoogleAnalyticsTag } from './components/GoogleAnalytics'

const notoSansJP = Noto_Sans_JP({
	subsets: ['latin'],
	display: 'swap',
	weight: ['400', '500', '700'],
	variable: '--font-noto-sans-jp',
})
const RootLayout: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	return (
		<html prefix="og: http://ogp.me/ns#" lang="ja">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="icon" href="/android-chrome-192×192.png" type="image/png" />
				<link
					rel="apple-touch-icon"
					href="/apple-icon.png"
					type="image/png"
					sizes="180x180"
				/>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&amp;display=swap"
				/>
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
				<GoogleAnalyticsTag />
			</head>
			<body
				className={`font-noto bg-white scroll-smooth break-words ${notoSansJP.variable}`}
				itemScope
				itemType="https://schema.org/WebPage"
			>
				<Svg />
				<div className="flex flex-col min-h-screen pt-[var(--header--height)]">
					<Header />
					<div className="flex-grow">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	)
}

export default RootLayout

export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
	formatDetection: {
		telephone: false,
	},
	metadataBase: new URL(SITE_URL),
	title: {
		template: `%s | ${SITE_TITLE_DEFAULT}`,
		absolute: SITE_TITLE_DEFAULT,
	},
	description: SITE_DESCRIPTION_DEFAULT,
	alternates: {
		canonical: SITE_URL,
	},
	openGraph: {
		type: 'website',
		locale: 'ja',
		url: SITE_URL,
		siteName: 'SiteName',
		images: [
			{
				url: SITE_URL + '/img-ogp.png',
				width: 800,
				height: 600,
				alt: SITE_TITLE_DEFAULT,
			},
		],
	},
	// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#twitter
	twitter: {
	}
}
