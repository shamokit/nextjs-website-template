import React from 'react'
import { BREAK_POINTS } from '@/utils/const'
import type { ImgixParam } from '@/components/ui/image/Imgix/type'

type SourceProps = Omit<
	React.ComponentPropsWithoutRef<'source'>,
	'srcSet' | 'width' | 'height'
> & { srcSet: string; width: number; height: number }
export type ImgixSourceProps = SourceProps & ImgixParam
export type ImgixSourcePropsWithMedia = Omit<ImgixSourceProps, 'media'> & {
	mediaSize: keyof typeof BREAK_POINTS
}
export type ImgixSourcePropsWithoutMedia = Omit<ImgixSourceProps, 'media'>
