import React from 'react'
import { SITE_URL } from '@/utils/meta'
import { PaginationProps } from './type'
import { PaginationLink } from '@/components/ui/pagination/PaginationLink'
import { PaginationFirst } from '@/components/ui/pagination/PaginationFirst'
import { PaginationPrevious } from '@/components/ui/pagination/PaginationPrevious'
import { PaginationNext } from '@/components/ui/pagination/PaginationNext'
import { PaginationLast } from '@/components/ui/pagination/PaginationLast'
import { PaginationDot } from '@/components/ui/pagination/PaginationDot'
import { PaginationItems } from '@/components/ui/pagination/PaginationItems'
import {
	getTotalPages,
	getLimitedCurrent,
	getPaginationLinks,
	getNextUrl,
	getPreviousUrl,
} from './functions'
/**
 * ページネーションを表示します。
 *
 * @type {string} archiveSlug - newsやnews/category_slugのような先頭と末尾がスラッシュで終わらない文字列
 * @type {number} totalCounts - 全記事数
 * @type {number} itemsInViewMax - 前後、最初、最後のリンクを除くページネーションリンクをいくつ画面に表示するか
 * @type {number} perPage - 一ページに何件の記事を表示するか
 * @type {number} current - 今何ページ目か
 */
export const Pagination: React.FC<PaginationProps> = ({
	archiveSlug = 'news',
	totalCounts,
	itemsInViewMax = 5,
	perPage = 10,
	current,
}) => {
	if (typeof totalCounts !== 'number' || totalCounts < 0)
		throw Error('totalCountsには正の整数を指定してください。')
	if (itemsInViewMax < 3 || itemsInViewMax % 2 === 0)
		throw Error('itemsInViewMaxには3より大きい奇数を指定してください。')
	if (typeof perPage !== 'number' || perPage <= 0)
		throw Error('perPageには正の整数を指定してください。')
	if (typeof current !== 'number' || current <= 0)
		throw Error('currentには正の整数を指定してください。')

	// 何ページまであるか
	const totalPages = getTotalPages({ totalCounts, perPage })

	// 1~totalPagesまでに制限したカレント
	const limitedCurrent = getLimitedCurrent({ current, totalPages })

	// 記事アーカイブページ/前のページ/次のページへのURL
	const fullArchiveUrl = `${SITE_URL}/${archiveSlug}/`
	const previousUrl = getPreviousUrl({ limitedCurrent, fullArchiveUrl })
	const nextUrl = getNextUrl({ limitedCurrent, fullArchiveUrl, totalPages })

	// ページネーションに表示する数字の配列
	const itemsInView = getPaginationLinks({ limitedCurrent, totalPages, itemsInViewMax })
	const paginationItems = itemsInView.map((pageNum) => {
		return (
			<PaginationLink
				key={pageNum}
				current={pageNum === limitedCurrent ?? undefined}
				href={pageNum === 1 ? fullArchiveUrl : `${fullArchiveUrl}pages/${pageNum}/`}
			>
				{pageNum}
			</PaginationLink>
		)
	})
	return (
		<nav aria-label="ページナビゲーション">
			<ul className="flex flex-wrap items-end gap-2">
				<PaginationItems>
					<PaginationFirst fullArchiveUrl={fullArchiveUrl} current={limitedCurrent} />
					{previousUrl && (
						<PaginationPrevious current={limitedCurrent} previousUrl={previousUrl} />
					)}
					{itemsInView.at(0) !== 1 && <PaginationDot />}
					{paginationItems}
					{itemsInView.at(-1) !== totalPages && <PaginationDot />}
					{nextUrl && (
						<PaginationNext
							nextUrl={nextUrl}
							current={limitedCurrent}
							totalPages={totalPages}
						/>
					)}
					<PaginationLast
						fullArchiveUrl={fullArchiveUrl}
						current={limitedCurrent}
						totalPages={totalPages}
					/>
				</PaginationItems>
			</ul>
		</nav>
	)
}
