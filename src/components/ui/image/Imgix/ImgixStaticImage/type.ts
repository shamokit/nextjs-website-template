import React from 'react'
import { BREAK_POINTS } from '@/libs/const'
import type { ImgixParam } from '@/components/ui/image/Imgix/type'

type ImgProps = Omit<
	React.ComponentPropsWithoutRef<'img'>,
	'src' | 'width' | 'height' | 'alt'
> & {
	width: number
	height: number
	src: string
	alt: string
}
export type ImgixImgProps = ImgProps & ImgixParam
export type ImgixImgPropsWithMedia = Omit<ImgixImgProps, 'media'> & {
	mediaSize: keyof typeof BREAK_POINTS
}
export type ImgixImgPropsWithoutMedia = Omit<ImgixImgProps, 'media'>
