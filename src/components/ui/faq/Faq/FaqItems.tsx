import Head from 'next/head'
import type { FaqItemsProps } from './type'
import { jsonLdScriptProps } from '@/libs/react-schemaorg'
import { FAQPage } from '@/libs/schema-dts'
import { FaqItem } from '@/components/ui/faq/Faq/FaqItem'
export const FaqItems: React.FC<FaqItemsProps> = ({
	faqs,
	jsonLd = true
}) => {
	const faqJson: {
		"@type": "Question",
		"name": string,
		"acceptedAnswer": {
			"@type": "Answer",
			"text": string
		}}[] = faqs.map((faq) => {
			return (
				{
					"@type": "Question",
					"name": `${faq.title}`,
					"acceptedAnswer": {
						"@type": "Answer",
						"text": `${faq.children}`
					}
				}
			)
		}
	)
	return (
		<>
			{jsonLd && (
				<Head>
					<script
						{...jsonLdScriptProps<FAQPage>({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							"mainEntity": faqJson
						})}
					/>
				</Head>
			)}
			<ul>
				{faqs.map((faq) => {
					return (
						<FaqItem title={faq.title} key={`${faq.title}`}>
							{faq.children}
						</FaqItem>
					)
				})}
			</ul>
		</>
	)
}
