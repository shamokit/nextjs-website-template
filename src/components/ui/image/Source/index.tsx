import React, { useContext } from 'react'

import { BREAK_POINTS } from '@/utils/const'

import { generateSrcsetByExtensions } from '@/components/ui/image/function'
import { RefContext } from '@/components/ui/image/Picture'

import { TRANSPARENT_DUMMY_IMAGE } from '../const'
import type { SourceWithMediaProps } from './type'

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
	const inView = useContext(RefContext)
	const el = srcsetByExtensions.map((srcsetByExtension, index) => {
		return srcsetByExtension.ext !== 'default' ? (
			<source
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<source
				srcSet={inView ? srcsetByExtension.url || undefined : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				{...restProps}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		)
	})
	return el
}
