'use client'

import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

import type { PageContent } from '@/schemas/staticPage/type'

import { usePreview } from '@/libs/microcms-api-client'

import { Breadcrumb } from '@/components/layout/breadcrumb/Breadcrumb'
import type { BreadcrumbItemProps } from '@/components/layout/breadcrumb/Breadcrumb/BreadcrumbItem/type'
import { generateBreadcrumbObjects } from '@/components/layout/breadcrumb/functions/generateBreadcrumbObjects'

type PageProps = {
	pageData?: PageContent
	breadcrumb?: BreadcrumbItemProps[]
	status?: string
}
const StaticPage: NextPage<PageProps> = () => {
	const [prevPageResponse] = usePreview<PageContent>()
	const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItemProps[]>()
	useEffect(() => {
		if (!prevPageResponse) return
		const { pageObjects: breadcrumbList } = generateBreadcrumbObjects(prevPageResponse)
		setBreadcrumb(breadcrumbList)
	}, [prevPageResponse])
	if (!prevPageResponse) return null
	return (
		<>
			<main>
				<h1>{prevPageResponse.title}</h1>
			</main>
			{breadcrumb ? <Breadcrumb list={breadcrumb} /> : null}
		</>
	)
}

export default StaticPage
