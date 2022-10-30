import React from 'react'
import type { PictureProps } from '@/components/ui/image/Picture/type'
import { Source } from '@/components/ui/image/Source/index'
import type { StaticImageProps } from '@/components/ui/image/StaticImage/type'
import { StaticImage } from '@/components/ui/image/StaticImage/index'
/**
 * @type {string} imageProps.src - public/imagesフォルダ内のpngもしくはjpgの画像へのパス
 * @return sourceタグで各サイズのWebP画像、imgタグで各サイズの元の拡張子の画像を遅延読み込みして表示します
 */
export const Picture: React.FC<{
	imageProps: StaticImageProps
	pictureProps?: PictureProps
}> = ({ imageProps: { src, width, height, ...restImageProps }, pictureProps }) => {
	return (
		<picture {...pictureProps}>
			<Source srcSet={src} width={width} height={height} />
			<StaticImage src={src} width={width} height={height} {...restImageProps} />
		</picture>
	)
}
