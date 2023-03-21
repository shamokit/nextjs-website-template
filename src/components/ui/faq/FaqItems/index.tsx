import Head from 'next/head'

import { jsonLdScriptProps } from '@/libs/react-schemaorg'
import { FAQPage } from '@/libs/schema-dts'

import { FaqItem } from '@/components/ui/faq/FaqItem'

import type { FaqItemsProps } from './type'

export const FaqItems: React.FC<FaqItemsProps> = ({ faqs, jsonLd = true, className }) => {
	const faqJson: {
		'@type': 'Question'
		name: string
		acceptedAnswer: {
			'@type': 'Answer'
			text: string
		}
	}[] = faqs.map((faq) => {
		return {
			'@type': 'Question',
			name: `${faq.title}`,
			acceptedAnswer: {
				'@type': 'Answer',
				text: `${faq.children}`,
			},
		}
	})
	return (
		<>
			{jsonLd ? (
				<Head>
					<script
						{...jsonLdScriptProps<FAQPage>({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: faqJson,
						})}
					/>
				</Head>
			) : null}
			<ul className={className}>
				{faqs.map((faq) => {
					return (
						<li key={`${faq.title}`}>
							<FaqItem title={faq.title}>{faq.children}</FaqItem>
						</li>
					)
				})}
			</ul>
		</>
	)
}
