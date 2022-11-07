import React from 'react'
import { useInView } from '@/libs/react-intersection-observer'
import type { ImageProps } from '@/components/ui/image/Image/type'
import { TRANSPARENT_DUMMY_IMAGE } from '@/utils/const'
import { generateSrcsetByExtensions } from '@/components/ui/image/function'
export const Image: React.FC<ImageProps> = ({
	src,
	width,
	height,
	alt,
	decoding = 'async',
	inArtDirection = false,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const srcsetByExtensions = generateSrcsetByExtensions({
		src,
		width,
	})
	const el = srcsetByExtensions.map((srcsetByExtension, index) => {
		return srcsetByExtension.ext !== 'default' ? (
			<source
				ref={ref}
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<img
				ref={ref}
				srcSet={inView ? srcsetByExtension.url || undefined : TRANSPARENT_DUMMY_IMAGE}
				src={src}
				alt={alt ?? ''}
				width={width}
				height={height}
				decoding={decoding}
				{...restProps}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		)
	})
	return <>{inArtDirection ? <>{el}</> : <picture>{el}</picture>}</>
}
