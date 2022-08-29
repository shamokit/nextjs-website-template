/**
 * @return メディアクエリ どのデバイス用のスタイルが当たっているかを取得
 */
export const getDevice = () => {
	const mediaQueryElem = document.querySelectorAll('[data-media-query]')
	if (!mediaQueryElem) {
		return 'lg'
	}

	const elmFirst = 0

	return getComputedStyle(mediaQueryElem[elmFirst], '').fontFamily.replace(/"/g, '')
}
