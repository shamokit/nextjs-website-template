import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { NextSeo } from '@/libs/next-seo'
import { Container } from '@/components/layout/container/Container'
import { SimpleMainVisual } from '@/components/layout/mainVisual/SimpleMainVisual'
import { Text } from '@/components/ui/text/Text'
import { Image } from '@/components/ui/image/Image'
import { ImgixImage } from '@/components/ui/image/Imgix/ImgixImage'
import { ImgixArtDirection } from '@/components/ui/image/Imgix/ImgixArtDirection'
import { ImgixSourceWithMedia } from '@/components/ui/image/Imgix/ImgixSource'
import { ArtDirection } from '@/components/ui/image/ArtDirection'
import { SourceWithMedia } from '@/components/ui/image/Source'
import { Accordion } from '@/components/ui/accordion/Accordion'
import { FaqItems } from '@/components/ui/faq/FaqItems'
import { TabButton } from '@/components/ui/tab/TabButton'
import { TabContent } from '@/components/ui/tab/TabContent'
import { useToggle } from '@/utils/useToggle'
const Home: NextPage = () => {
	const accordionRef = useRef<HTMLButtonElement>(null)
	const accordionContentRef = useRef<HTMLDivElement>(null)
	const [open, doAccordion] = useToggle(accordionRef, accordionContentRef, true)
	const [activeTab, toggleActiveTab] = useState('A')
	useEffect(() => {
		document.querySelectorAll('[aria-label="テストタブ"] details').forEach((item) => {
			item.addEventListener("toggle", (e) => {
				const details = document.querySelector(`[id="${e.target.id}"]`)
				if(details?.getAttribute("open") === "") {
					toggleActiveTab(details?.getAttribute("id"))
				}
			})
		});
	},[])
	useEffect(() => {
		document.querySelectorAll('[aria-label="テストタブ"] details').forEach((item) => {
			item.removeAttribute('open')
			item.removeAttribute('style')
			if(item.getAttribute('id') === activeTab) {
				const details = document.getElementById(activeTab)
				if(!details) return
				details?.setAttribute('open', '')
				const summaryHeight = document.querySelector(`[aria-label="テストタブ"] details[id="${activeTab}"] summary`)?.getBoundingClientRect().height ?? 0
				const contentHeight = document.querySelector(`[aria-label="テストタブ"] details[id="${activeTab}"] summary + *`)?.getBoundingClientRect().height ?? 0
				details.style.height = `${summaryHeight + contentHeight}px`
			}
		});
	},[activeTab])
	const tags = ["A", "B"]
	return (
		<>
			<NextSeo />
			<ul aria-label="テストタブ" className='relative flex gap-2'>
				<li>
					<details id="A" className="group">
						<summary
							onClick={(e) => {
								e.preventDefault()
								toggleActiveTab('A')
							}}
							onKeyUp={(e) => {
								if(e.key=== "ArrowRight") {
									document.querySelector<HTMLDetailsElement>(`[aria-label="テストタブ"] details[id="B"] summary`)?.focus()
									toggleActiveTab('B')
								}
							}}
							className="block group-open:bg-primary-500 group-open:text-white"
						>
							A_Title
						</summary>
						<div className='absolute left-0 right-0'>contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA<br />contentA</div>
					</details>
				</li>
				<li>
					<details id="B" className="group">
						<summary
							onClick={(e) => {
								e.preventDefault()
								toggleActiveTab('B')
							}}
							onKeyUp={(e) => {
								if(e.key=== "ArrowLeft") {
									document.querySelector<HTMLDetailsElement>(`[aria-label="テストタブ"] details[id="A"] summary`)?.focus()
									toggleActiveTab('A')
								}
							}}
							className="block group-open:bg-primary-500 group-open:text-white"
						>
							B_Title
						</summary>
						<div className='absolute left-0 right-0'>contentB<br />contentB<br />contentB<br />contentB<br />contentB</div>
					</details>
				</li>
			</ul>
			<ImgixImage
				src="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png"
				width={800}
				height={600}
				alt=""
				imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
				preload={true}
			/>
			<ImgixArtDirection>
				<ImgixSourceWithMedia
					mediaSize="lg"
					srcSet="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/2bedd8d6b0804ceebc0d869420fa7421/Group%202.png"
					width={600}
					height={800}
					imgixParam={{ fit: 'clamp', w: 1600, arrowLow: true }}
					preload={true}
				/>
				<ImgixSourceWithMedia
					mediaSize="md"
					srcSet="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png"
					width={800}
					height={600}
					imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
					preload={true}
				/>
				<ImgixImage
					src="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/5b10d44c214143e2886052d7f3c2a797/icon_fill.png"
					width={800}
					height={800}
					alt=""
					imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
					preload={true}
					inArtDirection={true}
				/>
			</ImgixArtDirection>

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
						alt=""
					/>
				</ArtDirection>
			</SimpleMainVisual>
			<Container>
				<main>
					<FaqItems
						faqs={[
							{
								title: 'bar',
								children: 'test',
							},
							{
								title: 'foo',
								children: '<p>bar</p>',
							},
						]}
					/>
					<Image src="/images/2560x2560.png" width={2560} height={2560} alt="" />
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
