import React from 'react'
export type StaticImageProps = Omit<React.ComponentPropsWithoutRef<'img'>, "width" | "height" | "src"> & {
	width: number
	height: number
	src: string
	inArtDirection?: boolean
}
