import { useRef } from 'react'
import type { NextPage } from 'next'
import { NextSeo } from '@/libs/next-seo'
import { Container } from '@/components/layout/container/Container'
import { SimpleMainVisual } from '@/components/layout/mainVisual/SimpleMainVisual/index'
import { Text } from '@/components/ui/text/Text'
import { Image } from '@/components/ui/image/Image/index'
import { ArtDirection } from '@/components/ui/image/ArtDirection/index'
import { SourceWithMedia } from '@/components/ui/image/Source'
import { Accordion } from '@/components/ui/accordion/Accordion/index'
import { FaqItems } from '@/components/ui/faq/Faq/FaqItems'
import { useToggle } from '@/utils/useToggle'
const Home: NextPage = () => {
	const accordionRef = useRef<HTMLButtonElement>(null)
	const accordionContentRef = useRef<HTMLDivElement>(null)
	const [open, doAccordion] = useToggle(accordionRef, accordionContentRef, true)
	return (
		<>
			<NextSeo />
			<SimpleMainVisual
				title={'TOP'}
				copy={
					'キャッチコピーが入ります。<br>キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。'
				}
			>
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
					<Image
						src="/images/150x150.png"
						width={150}
						height={150}
						inArtDirection={true}
					/>
				</ArtDirection>
			</SimpleMainVisual>
			<Container>
				<main>
					<FaqItems faqs={[{
						title: "hoge",
						children: "test"
					},
					{
						title: "foo",
						children: "<p>bar</p>"
					}]} />
					<Image
						src="/images/2560x2560.png"
						width={2560}
						height={2560}
					/>
					<section>
						<h2 className="mb-md text-2xl font-bold">budouX</h2>
						<Text
							text={`budouXによって改行位置が調整されます。<br />必須で改行させたい部分には<br />も使えます。`}
						/>
					</section>
					<section className="mt-xl pt-xl border-t border-primary-500">
						<h2 className="mb-md text-2xl font-bold">Accordion</h2>
						<section>
							<h3 className="mb-sm text-xl font-bold">Details</h3>
							<Accordion title="Accordion">
								<div className="p-md">
									<p>初期状態:Close</p>
								</div>
							</Accordion>
						</section>
						<section className="mt-md">
							<h3 className="mb-sm text-xl font-bold">Other</h3>
							<button
								ref={accordionRef}
								onClick={(e) => doAccordion(e)}
								aria-controls="panel1"
								aria-expanded={open}
							>
								Accordion
							</button>
							<div ref={accordionContentRef} id="panel1" className="overflow-hidden">
								<div className="p-md bg-surface-500">
									<p>初期状態:Open</p>
								</div>
							</div>
						</section>
					</section>
				</main>
			</Container>
		</>
	)
}
export default Home
