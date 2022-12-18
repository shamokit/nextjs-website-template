import React, { useContext } from 'react'
import Head from 'next/head'
import { TRANSPARENT_DUMMY_IMAGE } from '../../const'
import type { ImgixImgPropsWithoutMedia } from '@/components/ui/image/Imgix/ImgixImage/type'
import { RefContext } from '@/components/ui/image/Imgix/ImgixPicture'
import {
	getAdjustedSize,
	generateSrcsetByExtensions,
} from '@/components/ui/image/Imgix/function'

export const ImgixImage: React.FC<
	ImgixImgPropsWithoutMedia & {
		preload?: boolean
	}
> = ({
	src,
	width,
	height,
	alt,
	imgixParam,
	decoding = 'async',
	preload = false,
	...restProps
}) => {
	const inView = useContext(RefContext)
	const [adjustedWidth, adjustedHeight] = getAdjustedSize({ width, height, imgixParam })
	const srcsetByExtensions = generateSrcsetByExtensions({
		src,
		adjustedWidth,
		adjustedHeight,
		imgixParam,
	})

	// https://web.dev/i18n/ja/preload-responsive-images/
	const avifExtensionSrcSet = srcsetByExtensions.filter((srcsetByExtension) => {
		return srcsetByExtension.ext === 'avif'
	})[0]
	const el = srcsetByExtensions.map((srcsetByExtension, index) => {
		return srcsetByExtension.ext !== 'default' ? (
			<source
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={adjustedWidth}
				height={adjustedHeight}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<img
				srcSet={inView ? srcsetByExtension.url || undefined : TRANSPARENT_DUMMY_IMAGE}
				src={src}
				alt={alt ?? ''}
				width={adjustedWidth}
				height={adjustedHeight}
				decoding={decoding}
				{...restProps}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		)
	})
	return (
		<>
			{preload && (
				<Head>
					<link
						rel="preload"
						imageSrcSet={avifExtensionSrcSet.url}
						as="image"
						imageSizes="100vw"
					/>
				</Head>
			)}
			<>{el}</>
		</>
	)
}
