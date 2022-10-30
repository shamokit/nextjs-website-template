import React from 'react'
import { useInView } from 'react-intersection-observer'
import { TRANSPARENT_DUMMY_IMAGE, BROWSER_SIZES } from '@/components/ui/image/const'
import type { StaticImageProps } from '@/components/ui/image/StaticImage/type'
import { getFileData } from '@/components/ui/image/function'
export const StaticImage: React.FC<StaticImageProps> = ({
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
	const { fileName, fileExtension } = getFileData(src)
	const srcset: string = BROWSER_SIZES.filter((browser_size) => {
		return browser_size <= width ? true : false
	})
		.map((browser_size) => {
			return `${fileName}@w${browser_size}.${fileExtension} ${browser_size}w`
		})
		.join(', ')
	let srcsetWebp = BROWSER_SIZES.filter((browser_size) => {
		return browser_size <= width ? true : false
	})
		.map((browser_size) => {
			return `${fileName}@w${browser_size}.webp ${browser_size}w`
		})
		.join(', ')
	if (!srcsetWebp) {
		srcsetWebp = `${fileName}.webp`
	}
	return (
		<>
			{inArtDirection && (
				<source
					ref={ref}
					srcSet={inView ? srcsetWebp : TRANSPARENT_DUMMY_IMAGE}
					width={width}
					height={height}
					type="image/webp"
				/>
			)}
			<img
				ref={ref}
				srcSet={inView ? srcset || undefined : TRANSPARENT_DUMMY_IMAGE}
				src={src}
				alt={alt ?? ''}
				width={width}
				height={height}
				decoding={decoding}
				{...restProps}
			/>
		</>
	)
}
