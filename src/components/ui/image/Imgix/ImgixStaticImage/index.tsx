import React from 'react'
import { useInView } from 'react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE } from '@/components/ui/image/const'
import type { ImgixImgPropsWithoutMedia } from '@/components/ui/image/Imgix/ImgixStaticImage/type'
import {
	getAdjustedSize,
	generateSrcsetByExtensions,
} from '@/components/ui/image/Imgix/function'

export const ImgixStaticImage: React.FC<
	ImgixImgPropsWithoutMedia & {
		inArtDirection?: boolean
	}
> = ({
	src,
	width,
	height,
	alt,
	imgixParam,
	decoding = 'async',
	inArtDirection = false,
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
	return <>{inArtDirection ? { el } : <picture ref={ref}>{el}</picture>}</>
}
