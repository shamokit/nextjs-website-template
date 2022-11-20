import type {
	GetImgixImageUrlParamProps,
	GetAdjustedSize,
	GenerateSrcsetByExtensionsProps,
} from './type'
import { BROWSER_SIZES } from '@/utils/const'

/**
 * getAdjustedSizeで計算した実際返ってくる画像のwidth,heightを使って、
 * 調整後のwidthとheightに置きなおしたURLを返します。
 *
 * @property adjustedWidth getAdjustedSizeで計算した、imgixから返ってくる画像のwidth
 * @property adjustedHeight getAdjustedSizeで計算した、imgixから返ってくる画像のheight
 * @property imgixParam imgixに渡すパラメータのオブジェクト
 * @property browser_size 各ブレイクポイントの値
 */
export const getImgixImageUrlParam = ({
	adjustedWidth,
	adjustedHeight,
	imgixParam,
	browser_size,
}: GetImgixImageUrlParamProps) => {
	if (!imgixParam) {
		return undefined
	}
	const imgixParamRemoveNoValue = Object.fromEntries(
		Object.entries(imgixParam).filter(([, v]) => v)
	)

	const paramArray = []
	// paramArray.push(`w=${browser_size}&amp;h=${adjustedHeight * scale}`)
	for (const [key, value] of Object.entries(imgixParamRemoveNoValue)) {
		// wパラメータを各ブレイクポイントに置き換えて、どれくらいの割合で変化したのか縮尺を出してhパラメータを計算する
		if (key === 'w') {
			paramArray.push(`w=${browser_size}`)
		}
		if (key === 'h') {
			const scale = browser_size / adjustedWidth
			paramArray.push(`h=${adjustedHeight * scale}`)
		}
		if (!(key === 'w' || key === 'h' || key === 'arrowLow')) {
			paramArray.push(`${key}=${value}`)
		}
	}
	const paramString = paramArray.join('&amp;')
	return `?${paramString}`
}

/**
 * width,height,fitからimgixに渡すパラメータを返します。
 * imgixにパラメータwを渡したとき、返ってくる画像のwidthはこれと一致しないので、返ってくる値を計算して画像のwidth属性とheight属性の指定に使用します。
 *
 * @property width 画像の元のwidth
 * @property height 画像の元のheight
 * @property imgixParam imgixに渡すパラメータのオブジェクト
 * @returns [adjustedWidth, adjustedHeight] imgixから返ってくる画像の最大の大きさ
 */
export const getAdjustedSize: GetAdjustedSize = ({ width, height, imgixParam }) => {
	const aspect = width / height
	let [adjustedWidth, adjustedHeight] = [width, height]
	if (!imgixParam) return [adjustedWidth, adjustedHeight]
	const { fit, w: imgixParamWidth, h: imgixParamHeight } = imgixParam
	const arrowLow = fit === 'max' ? undefined : imgixParam.arrowLow
	switch (fit) {
		case 'clip':
		case 'clamp':
			if (aspect >= 1) {
				// widthのほうがheightよりも大きいか同じ場合
				if ((imgixParamWidth && imgixParamHeight) || imgixParamWidth) {
					adjustedWidth = arrowLow ? imgixParamWidth : Math.min(imgixParamWidth, width)
					adjustedHeight = (adjustedWidth / width) * height
					if (imgixParamWidth && imgixParamHeight && arrowLow && fit === 'clamp') {
						adjustedHeight = imgixParamHeight
					}
				} else if (imgixParamHeight) {
					adjustedHeight = arrowLow
						? imgixParamHeight
						: Math.min(imgixParamHeight, height)
					adjustedWidth = ((adjustedHeight ?? height) / height) * width
				}
			} else {
				// heightのほうがwidthよりも大きい場合
				if ((imgixParamWidth && imgixParamHeight) || imgixParamHeight) {
					adjustedHeight = arrowLow
						? imgixParamHeight
						: Math.min(imgixParamHeight, height)
					adjustedWidth = (adjustedHeight / height) * width
					if (imgixParamWidth && imgixParamHeight && arrowLow && fit === 'clamp') {
						adjustedWidth = imgixParamWidth
					}
				} else if (!(imgixParamWidth && imgixParamHeight)) {
					//
				} else {
					adjustedWidth = arrowLow
						? imgixParamWidth
						: Math.min(imgixParamWidth ?? width, width)
					adjustedHeight = ((adjustedWidth ?? width) / width) * height
				}
			}
			break
		case 'crop':
			// 正しい設定
			if (imgixParamWidth && imgixParamHeight) {
				const imgAspect = imgixParamWidth / imgixParamHeight
				// 普通こちらに入ってくる
				if ((imgAspect >= 1 && aspect >= 1) || (imgAspect < 1 && aspect < 1)) {
					if (imgAspect >= 1 && aspect >= 1) {
						adjustedWidth = arrowLow ? imgixParamWidth : Math.min(imgixParamWidth, width)
						adjustedHeight = adjustedWidth / imgAspect
						if (!arrowLow && adjustedHeight >= height) {
							adjustedHeight = height
							adjustedWidth = adjustedHeight * imgAspect
						}
					} else {
						adjustedHeight = arrowLow
							? imgixParamHeight
							: Math.min(imgixParamHeight, height)
						adjustedWidth = adjustedHeight * imgAspect
						if (adjustedWidth > width) {
							adjustedWidth = width
							adjustedHeight = adjustedWidth / imgAspect
						}
					}
				} else {
					// 横長指定の時に縦長の画像
					if (imgAspect >= 1 && aspect < 1) {
						adjustedWidth = arrowLow ? imgixParamWidth : width
						adjustedHeight = adjustedWidth / imgAspect
					} else {
						//縦長指定の時に横長の画像
						adjustedHeight = arrowLow ? imgixParamHeight : height
						adjustedWidth = adjustedHeight * imgAspect
					}
				}
				// ミスで片方のみ設定された場合
			} else if (imgixParamWidth) {
				adjustedWidth = arrowLow ? imgixParamWidth : Math.min(imgixParamWidth, width)
				adjustedHeight = aspect >= 1 ? adjustedWidth / aspect : adjustedWidth * aspect
			} else if (imgixParamHeight) {
				adjustedHeight = arrowLow ? imgixParamHeight : Math.min(imgixParamHeight, height)
				adjustedWidth = aspect >= 1 ? adjustedHeight * aspect : adjustedHeight / aspect
			}
			break
		case 'fill':
		case 'fillmax':
			if (imgixParamWidth && imgixParamHeight) {
				const imgAspect = imgixParamWidth / imgixParamHeight
				if (arrowLow) {
					adjustedWidth = imgixParamWidth
					adjustedHeight = imgixParamHeight
				} else {
					if (aspect >= 1) {
						adjustedWidth = Math.min(imgixParamWidth, width)
						adjustedHeight = adjustedWidth / imgAspect
						if (adjustedHeight > height) {
							adjustedHeight = height
							adjustedWidth = adjustedHeight * imgAspect
						}
					} else {
						adjustedHeight = Math.min(imgixParamHeight, height)
						adjustedWidth = adjustedHeight * imgAspect
						if (adjustedWidth > width) {
							adjustedWidth = height
							adjustedHeight = adjustedWidth / imgAspect
						}
					}
				}
			} else if (imgixParamWidth) {
				adjustedWidth = arrowLow ? imgixParamWidth : Math.min(imgixParamWidth, width)
				adjustedHeight = (adjustedWidth / width) * height
				if (imgixParamWidth && imgixParamHeight && arrowLow) {
					adjustedHeight = imgixParamHeight
				}
			} else if (imgixParamHeight) {
				adjustedHeight = arrowLow
					? imgixParamHeight
					: Math.min(imgixParamHeight ?? height, height)
				adjustedWidth = ((adjustedHeight ?? height) / height) * width
			}
			break
		case 'max':
			if (imgixParamWidth && imgixParamHeight) {
				if (aspect >= 1) {
					adjustedWidth = Math.min(imgixParamWidth, width)
					adjustedHeight = adjustedWidth / aspect
					if (imgixParamHeight <= Math.min(adjustedHeight, height)) {
						adjustedHeight = imgixParamHeight
						adjustedWidth = adjustedHeight * aspect
					}
				} else {
					adjustedHeight = Math.min(imgixParamHeight, height)
					adjustedWidth = adjustedHeight / aspect
					if (imgixParamWidth <= Math.min(adjustedWidth, width)) {
						adjustedWidth = imgixParamWidth
						adjustedHeight = adjustedWidth * aspect
					}
				}
			} else if (imgixParamWidth) {
				adjustedWidth = Math.min(imgixParamWidth, width)
				adjustedHeight = aspect >= 1 ? adjustedWidth / aspect : adjustedWidth * aspect
			} else if (imgixParamHeight) {
				adjustedHeight = Math.min(imgixParamHeight, height)
				adjustedWidth = aspect >= 1 ? adjustedHeight * aspect : adjustedHeight / aspect
			}
			break
		default:
			break
	}
	return [Math.round(adjustedWidth), Math.round(adjustedHeight)]
}

/**
 * imgixに渡すパラメータの文字列の配列を作って、拡張子のパラメータを添えて返す
 * @returns src imgタグに指定するimgixのパラメータ付きURL
 * @returns ext 画像の拡張子
 */
export const generateSrcsetByExtensions = ({
	src,
	adjustedWidth,
	adjustedHeight,
	imgixParam,
}: GenerateSrcsetByExtensionsProps) => {
	// 画像のinitialサイズを追加して大→小に並び替え
	const browser_sizes = [adjustedWidth, ...BROWSER_SIZES].sort((a, b) => b - a)
	const extensions = ['avif', 'webp', 'default'] as const
	return extensions.map((ext) => {
		return {
			url: browser_sizes
				.filter((browser_size) => {
					return browser_size <= adjustedWidth ? true : false
				})
				.map((browser_size) => {
					const params = getImgixImageUrlParam({
						adjustedWidth,
						adjustedHeight,
						imgixParam,
						browser_size,
					})
					return `${src}${params ?? ''}${
						ext !== 'default' ? `&amp;format=${ext}&amp;lossless=1` : ''
					} ${browser_size}w`
				})
				.join(', '),
			ext,
		}
	})
}
