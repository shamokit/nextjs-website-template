import React from 'react'
import { useInView } from 'react-intersection-observer'
import { BREAK_POINTS } from 'src/libs/const'
import type { SourceWithMediaProps, SourceWithoutMediaProps } from '@/components/ui/image/Source/type'
import { TRANSPARENT_DUMMY_IMAGE, BROWSER_SIZES } from '@/components/ui/image/const'
import { getFileData } from '@/components/ui/image/function'
export const SourceWithMedia: React.FC<SourceWithMediaProps> = ({
	srcSet,
	width,
	height,
	mediaSize,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const { fileName, fileExtension } = getFileData(srcSet)
	const BROWSER_SIZES_AND_FILE_WIDTH = [...BROWSER_SIZES, width]
	const srcset = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		if(browser_size === width) {
			return `${fileName}.${fileExtension} ${browser_size}w`
		} else {
			return `${fileName}@w${browser_size}.${fileExtension} ${browser_size}w`
		}
	}).join(', ')
	const srcsetWebp = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		if(browser_size === width) {
			return `${fileName}.webp ${browser_size}w`
		} else {
			return `${fileName}@w${browser_size}.webp ${browser_size}w`
		}
	}).join(', ')
	return (
		<>
			<source
				ref={ref}
				srcSet={
					inView ? srcsetWebp : TRANSPARENT_DUMMY_IMAGE
				}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				type="image/webp"
				{...restProps}
			/>
			<source
				ref={ref}
				srcSet={
					inView ? srcset : TRANSPARENT_DUMMY_IMAGE
				}
				width={width}
				height={height}
				media={`(min-width: ${BREAK_POINTS[mediaSize]}px)`}
				{...restProps}
			/>
		</>
	)
}

export const Source: React.FC<SourceWithoutMediaProps> = ({
	srcSet,
	width,
	height,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const { fileName } = getFileData(srcSet)
	const BROWSER_SIZES_AND_FILE_WIDTH = [...BROWSER_SIZES, width]
	const srcsetWebp = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		if(browser_size === width) {
			return `${fileName}.webp`
		} else {
			return `${fileName}@w${browser_size}.webp ${browser_size}w`
		}
	}).join(', ')
	return (
		<source
			ref={ref}
			srcSet={
				inView ? srcsetWebp : TRANSPARENT_DUMMY_IMAGE
			}
			width={width}
			height={height}
			type="image/webp"
			{...restProps}
		/>
	)
}
