import React, { memo } from 'react'
import { useInView } from '@/libs/react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE } from '@/utils/const'
import { BREAK_POINTS } from '@/utils/const'
import type { ImgixSourcePropsWithMedia } from './type'
import {
	getAdjustedSize,
	generateSrcsetByExtensions,
} from '@/components/ui/image/Imgix/function'

export const ImgixSourceWithMedia: React.FC<ImgixSourcePropsWithMedia> = memo(
	({ srcSet, width, height, mediaSize, imgixParam, ...restProps }) => {
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
		return <>{el}</>
	}
)
