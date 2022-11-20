import React from 'react'
import Head from 'next/head'
import { useInView } from '@/libs/react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE } from '@/utils/const'
import type { ImgixImgPropsWithoutMedia } from '@/components/ui/image/Imgix/ImgixImage/type'
import {
	getAdjustedSize,
	generateSrcsetByExtensions,
} from '@/components/ui/image/Imgix/function'

export const ImgixImage: React.FC<
	ImgixImgPropsWithoutMedia & {
		inArtDirection?: boolean
		preload?: boolean
	}
> = ({
	src,
	width,
	height,
	alt,
	imgixParam,
	decoding = 'async',
	inArtDirection = false,
	preload = false,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
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
				ref={ref}
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={adjustedWidth}
				height={adjustedHeight}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<img
				ref={ref}
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
			{inArtDirection ? (
				<>{el}</>
			) : (
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
					<picture>{el}</picture>
				</>
			)}
		</>
	)
}
