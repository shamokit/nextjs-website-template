import React from 'react'
import { useInView } from '@/libs/react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE } from '@/utils/const'
import { BREAK_POINTS } from '@/utils/const'
import type { SourceWithMediaProps } from './type'
import { generateSrcsetByExtensions } from '@/components/ui/image/function'

export const SourceWithMedia: React.FC<SourceWithMediaProps> = ({
	srcSet,
	width,
	height,
	mediaSize,
	...restProps
}) => {
	const srcsetByExtensions = generateSrcsetByExtensions({
		src: srcSet,
		width,
	})
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const el = srcsetByExtensions.map((srcsetByExtension, index) => {
		return srcsetByExtension.ext !== 'default' ? (
			<source
				ref={ref}
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<source
				ref={ref}
				srcSet={inView ? srcsetByExtension.url || undefined : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				{...restProps}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		)
	})
	return <>{el}</>
}
