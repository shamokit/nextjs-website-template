import { Head, Html, Main, NextScript } from 'next/document'
const Document: React.FC = () => {
	return (
		<Html prefix="og: http://ogp.me/ns#" lang="ja">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
				/>
			</Head>
			<body
				className="font-noto bg-white scroll-smooth"
				itemScope
				itemType="https://schema.org/WebPage"
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document
