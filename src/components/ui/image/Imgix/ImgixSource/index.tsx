import React from 'react'
import { useInView } from 'react-intersection-observer'
import { BREAK_POINTS } from 'src/libs/const'
import type { ImgixSourcePropsWithMedia, ImgixSourcePropsWithoutMedia } from './type'
import { TRANSPARENT_DUMMY_IMAGE, BROWSER_SIZES } from '@/components/ui/image/const'
import { getImgixImageUrlParam } from '../function'

export const ImgixSourceWithMedia: React.FC<ImgixSourcePropsWithMedia> = ({
	srcSet,
	width,
	height,
	mediaSize,
	imgixParam,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const BROWSER_SIZES_AND_FILE_WIDTH = [...BROWSER_SIZES, width].filter(x=>x) as number[]
	const srcset = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		if(!width) return true
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		if(browser_size === width) {
			return `${srcSet} ${browser_size}w`
		} else {
			return `${srcSet}?format=webp&lossless=1&w=${browser_size} ${browser_size}w`
		}
	}).join(', ')
	const srcsetWebp = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		if(!width) return true
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		const params = getImgixImageUrlParam({width, height, imgixParam, browser_size})
		if(browser_size === width) {
			return `${srcSet}${params} ${browser_size}w`
		} else {
			return `${srcSet}${params}&format=webp&lossless=1 ${browser_size}w`
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

export const ImgixSource: React.FC<ImgixSourcePropsWithoutMedia> = ({
	srcSet,
	width,
	height,
	imgixParam,
	...restProps
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	const BROWSER_SIZES_AND_FILE_WIDTH = [...BROWSER_SIZES, width].filter(x=>x) as number[]
	const srcsetWebp = BROWSER_SIZES_AND_FILE_WIDTH.filter((browser_size) => {
		if(!width) return true
		return browser_size <= width ? true : false
	}).map((browser_size) => {
		if(browser_size === width) {
			return srcSet
		} else {
			return `${srcSet}?format=webp&lossless=1&w=${browser_size}&fit=${imgixParam?.fit} ${browser_size}w`
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
