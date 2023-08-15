/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	reactStrictMode: true,
	swcMinify: true,
	// images: {
	// 	disableStaticImages: true,
	// 	domains: ['placehold.jp'],
	// 	remotePatterns: [
	// 		{
	// 			protocol: 'https',
	// 			hostname: '**.placehold.jp',
	// 		},
	// 	],
	// }
}

module.exports = nextConfig
