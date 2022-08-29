const SITE_URL = 'https://example.com'
const SITE_TITLE_DEFAULT = 'SiteTemplateTitle'
const SITE_DESCRIPTION_DEFAULT = 'SiteTemplateDescription'
export default {
	titleTemplate: "%s | " + SITE_TITLE_DEFAULT,
	defaultTitle: SITE_TITLE_DEFAULT,
	description: SITE_DESCRIPTION_DEFAULT,
	canonical: SITE_URL,
	openGraph: {
		type: 'website',
		locale: 'ja',
		url: SITE_URL,
		site_name: 'SiteName',
		images: [
			{
				url: SITE_URL + '/img_ogp.png',
				width: 800,
				height: 600,
				alt: SITE_TITLE_DEFAULT,
			},
		]
	},
	twitter: {
		handle: '@userName',
		site: '@siteAccountName',
		cardType: 'summary_large_image',
	},
	facebook: {
		appId: 'facebookAppId',
	},
	additionalMetaTags: [
		{
			name: 'viewport',
			content: "width=device-width, initial-scale=1.0",
		},
		{
			name: 'format-detection',
			content: "telephone=no",
		}
	],
	additionalLinkTags: [
		{
			rel: 'icon',
			href: SITE_URL + '/favicon.ico', //16, 32
		},
		{
			rel: 'icon',
			href: SITE_URL + '/favicon.svg',
			type: "image/svg+xml"
		},
		{
			rel: 'icon',
			href: SITE_URL + '/android-chrome-192×192.png',
			type: "image/png"
		},
		{
			rel: 'apple-touch-icon',
			href: SITE_URL + '/apple-touch-icon.png',
			sizes: '180x180'
		}
	]
};
