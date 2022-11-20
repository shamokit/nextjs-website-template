/**
 * 記事数と一ページに表示する記事件数からページ数を計算します。
 */
export const getTotalPages = (totalCounts: number, perPage: number) => {
	const totalPagesInteger = Math.trunc(totalCounts / perPage)
	const totalPagesRemainder = totalCounts % perPage
	const totalPages =
		totalPagesInteger <= 0
			? 1
			: totalPagesRemainder === 0
			? totalPagesInteger
			: totalPagesInteger + 1
	return totalPages
}

/**
 * 最小値を1 最大値をページ数と制限してカレントを返します。
 */
export const getLimitedCurrent = (current: number, totalPages: number) => {
	let limitedCurrent = current
	if (current <= 0) {
		limitedCurrent = 1
	} else if (current > totalPages) {
		limitedCurrent = totalPages
	}
	return limitedCurrent
}

/**
 * ページネーションに使用する数字の配列を返します。
 */
export const getPaginationLinks = (
	limitedCurrent: number,
	totalPages: number,
	itemsInViewMax: number
) => {
	const halfItemsInViewMax = Math.trunc(itemsInViewMax / 2)
	const totalPagesArrayStartZero = [...Array(totalPages + 1)].map((_, num) => num)
	const currentIndex = totalPagesArrayStartZero.indexOf(limitedCurrent)

	// ページネーションリンクの一番左
	let startIndex =
		currentIndex - halfItemsInViewMax <= 1 ? 1 : currentIndex - halfItemsInViewMax
	// カレントから右に表示したい個数が足りない場合（最大ページ数付近）の補正
	if (totalPages - currentIndex < halfItemsInViewMax) {
		startIndex = startIndex - (halfItemsInViewMax - (totalPages - currentIndex))
	}
	// ページネーションリンクの一番右
	let endIndex =
		currentIndex + halfItemsInViewMax >= totalPages
			? totalPages
			: currentIndex + halfItemsInViewMax
	// カレントから左に表示したい個数が足りない場合（最初のページ数付近）の補正
	if (currentIndex - 1 < halfItemsInViewMax) {
		endIndex = endIndex + (halfItemsInViewMax - currentIndex) + 1
	}

	// 表示するページネーションの数字の配列
	const itemsInView: number[] = totalPagesArrayStartZero.filter((pageIndex) => {
		return (
			pageIndex >= Math.max(startIndex, 1) && pageIndex <= Math.min(endIndex, totalPages)
		)
	})
	return itemsInView
}

/**
 * 前のページへのURLを返します。
 * 前のページが存在しない場合はundefinedを返します。
 */
export const getPreviousUrl = (limitedCurrent: number, fullArchiveUrl: string) => {
	// /pages/1/のみ記事アーカイブページへのリンクで差し替える。
	return limitedCurrent === 1
		? undefined
		: limitedCurrent - 1 === 1
		? fullArchiveUrl
		: `${fullArchiveUrl}pages/${limitedCurrent - 1}/`
}

/**
 * 次のページへのURLを返します。
 * 次のページが存在しない場合はundefinedを返します。
 */
export const getNextUrl = (
	limitedCurrent: number,
	fullArchiveUrl: string,
	totalPages: number
) => {
	return limitedCurrent === totalPages
		? undefined
		: `${fullArchiveUrl}pages/${Math.min(limitedCurrent + 1, totalPages)}/`
}
