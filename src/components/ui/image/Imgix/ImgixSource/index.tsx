import React from 'react'
import Head from 'next/head'
import { useInView } from '@/libs/react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE } from '@/utils/const'
import { BREAK_POINTS } from '@/utils/const'
import type { ImgixSourcePropsWithMedia } from './type'
import {
	getAdjustedSize,
	generateSrcsetByExtensions,
} from '@/components/ui/image/Imgix/function'

export const ImgixSourceWithMedia: React.FC<ImgixSourcePropsWithMedia> = ({
	srcSet,
	width,
	height,
	mediaSize,
	imgixParam,
	preload = false,
	...restProps
}) => {
	const [adjustedWidth, adjustedHeight] = getAdjustedSize({ width, height, imgixParam })
	const srcsetByExtensions = generateSrcsetByExtensions({
		src: srcSet,
		adjustedWidth,
		adjustedHeight,
		imgixParam,
	})
	const { ref, inView } = useInView({
		triggerOnce: true,
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
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<source
				ref={ref}
				srcSet={inView ? srcsetByExtension.url || undefined : TRANSPARENT_DUMMY_IMAGE}
				width={adjustedWidth}
				height={adjustedHeight}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
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
						media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
						as="image"
						imageSizes="100vw"
					/>
				</Head>
			)}
			{el}
		</>
	)
}
