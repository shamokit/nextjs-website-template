/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: { runtime: 'experimental-edge'}
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
