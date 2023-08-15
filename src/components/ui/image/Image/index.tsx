import React, { useContext } from 'react'

import { generateSrcsetByExtensions } from '@/components/ui/image/function'
import type { ImageProps } from '@/components/ui/image/Image/type'
import { RefContext } from '@/components/ui/image/Picture'

import { TRANSPARENT_DUMMY_IMAGE } from '../const'

export const Image: React.FC<ImageProps> = ({
	src,
	width,
	height,
	alt,
	decoding = 'async',
	...restProps
}) => {
	const inView = useContext(RefContext)
	const srcsetByExtensions = generateSrcsetByExtensions({
		src,
		width,
	})
	const el = srcsetByExtensions.map((srcsetByExtension, index) => {
		return srcsetByExtension.ext !== 'default' ? (
			<source
				srcSet={inView ? srcsetByExtension.url : TRANSPARENT_DUMMY_IMAGE}
				width={width}
				height={height}
				type={`image/${srcsetByExtension.ext}`}
				key={`${srcsetByExtension.ext}${index}`}
			/>
		) : (
			<img
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
	return el
}
