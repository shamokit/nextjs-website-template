"use client";

import React, { useRef } from 'react'

import { useToggle } from '@/utils/useToggle'

import { Container } from '@/components/layout/container/Container'
import { Accordion } from '@/components/ui/accordion/Accordion'
import { FaqItems } from '@/components/ui/faq/FaqItems'
import { ArtDirection } from '@/components/ui/image/ArtDirection'
import { Image } from '@/components/ui/image/Image'
import { ImgixImage } from '@/components/ui/image/Imgix/ImgixImage'
import { ImgixPicture } from '@/components/ui/image/Imgix/ImgixPicture'
import { Picture } from '@/components/ui/image/Picture'
import { SourceWithMedia } from '@/components/ui/image/Source'
import { Tab } from '@/components/ui/tab/Tab'
import { TabList } from '@/components/ui/tab/TabList'
import { Text } from '@/components/ui/text/Text'

export const Main = () => {
	const accordionRef = useRef<HTMLButtonElement>(null)
	const accordionContentRef = useRef<HTMLDivElement>(null)
	const [open, doAccordion] = useToggle({
		accordionRef,
		accordionContentRef,
		initialValue: true,
	})
	return (
		<Container>
			<main>
				<p>
					microCMSを使用し、Cloudflare
					PagesでWebサイトをデプロイするテンプレートです。
				</p>
				<TabList
					tabClassName="group-open:bg-primary-500 group-open:text-white"
					ariaLabel="テストタブ1"
				>
					<Tab title="A_Title" index={0}>
						<div className="p-4">
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
							<br />
							contentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentAcontentA
						</div>
					</Tab>
					<Tab title="B_Title" index={1} activeFirst={true}>
						<div className="p-4">
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
							<br />
							contentB
						</div>
					</Tab>
				</TabList>
				<ImgixPicture>
					<ImgixImage
						src="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png"
						width={800}
						height={600}
						alt=""
						imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
					/>
				</ImgixPicture>
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
					<Image src="/images/150x150.png" width={150} height={150} alt="" />
				</ArtDirection>
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
				<Picture>
					<Image src="/images/2560x2560.png" width={2560} height={2560} alt="" />
				</Picture>
				<section>
					<h2 className="mb-6 text-2xl font-bold">budouX</h2>
					<Text
						text={`budouXによって改行位置が調整されます。<br />必須で改行させたい部分には<br />も使えます。`}
					/>
				</section>
				<section className="mt-10 pt-10 border-t border-primary-500">
					<h2 className="mb-6 text-2xl font-bold">Accordion</h2>
					<section>
						<h3 className="mb-4 text-xl font-bold">Details</h3>
						<Accordion title="Accordion">
							<div className="p-8">
								<p>初期状態:Close</p>
							</div>
						</Accordion>
					</section>
					<section className="mt-8">
						<h3 className="mb-4 text-xl font-bold">Other</h3>
						<button
							ref={accordionRef}
							onClick={(e) => doAccordion(e)}
							aria-controls="panel1"
							aria-expanded={open}
						>
							Accordion
						</button>
						<div ref={accordionContentRef} id="panel1" className="overflow-hidden">
							<div className="p-8 bg-surface-500">
								<p>初期状態:Open</p>
							</div>
						</div>
					</section>
				</section>
			</main>
		</Container>
	)
}
