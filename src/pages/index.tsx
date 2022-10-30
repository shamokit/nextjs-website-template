import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Container } from '@/components/layout/Container'
import { SimpleMainVisual } from '@/components/layout/mainVisual/SimpleMainVisual/index'
import { Text } from '@/components/ui/text/Text'
import { Picture } from '@/components/ui/image/Picture/index'
import { StaticImage } from '@/components/ui/image/StaticImage/index'
import { ImgixStaticImage } from '@/components/ui/image/Imgix/ImgixStaticImage'
import { ArtDirection } from '@/components/ui/image/ArtDirection/index'
import { SourceWithMedia } from '@/components/ui/image/Source'
import { Accordion } from '@/components/ui/accordion/Accordion/index'
import { Pagination } from '@/components/ui/pagination/index'

const Home: NextPage = () => {
	return (
		<>
			<NextSeo />
			{/* <SimpleMainVisual title={'TOP'} copy={'キャッチコピーが入ります。<br>キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。'}>
				<ArtDirection className="col-start-1 col-end-1 row-start-1 row-end-1">
					<SourceWithMedia
						mediaSize="lg"
						srcSet="/images/2560x2560.png"
						width={2560}
						height={2560}
					/>
					<SourceWithMedia
						mediaSize="md"
						srcSet="/images/600x400.png"
						width={600}
						height={400}
					/>
					<StaticImage
						src="/images/150x150.png"
						width={150}
						height={150}
						inArtDirection={true}
					/>
				</ArtDirection>
			</SimpleMainVisual> */}
			<Container>
				<main>
					<Text
						text={`budouXによって改行位置が調整されます。<br />必須で改行させたい部分には<br />も使えます。`}
					/>
					<Pagination
						archiveSlug="news"
						totalCounts={71}
						itemsInViewMax={5}
						current={3}
						perPage={10}
					/>
					<h2>ImgixStaticImage</h2>
					<section>
						<h3>ImgixStaticImage</h3>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, arrowLow: true}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, arrowLow: false}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, arrowLow: false}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 400, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 600, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 1200, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 400, arrowLow: false}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 600, arrowLow: false}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", h: 1200, arrowLow: false}} alt=""/>


						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 300, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 300, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 600, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 600, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 1200, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 800, h: 1200, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 600, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 600, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 300, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 300, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 1200, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 1600, h: 1200, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 600, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 600, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 300, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 300, arrowLow: false}} alt=""/>

						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 1200, arrowLow: true}} alt=""/>
						<ImgixStaticImage src='https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png' width={800} height={600} imgixParam={{fit: "clip", w: 400, h: 1200, arrowLow: false}} alt=""/>

					</section>
					<h2>ArtDirection</h2>
					<ArtDirection>
						<SourceWithMedia
							mediaSize="lg"
							srcSet="/images/2560x2560.png"
							width={2560}
							height={2560}
						/>
						<SourceWithMedia
							mediaSize="md"
							srcSet="/images/600x400.png"
							width={600}
							height={400}
						/>
						<StaticImage
							src="/images/150x150.png"
							width={150}
							height={150}
							inArtDirection={true}
						/>
					</ArtDirection>
					<h2>Accordion</h2>
					<Accordion title="Accordion" openDefault={true}>
						<div className="p-md">
							<p>本文コンテンツ</p>
						</div>
					</Accordion>
				</main>
			</Container>
		</>
	)
}

export default Home
