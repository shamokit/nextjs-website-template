"use client";

import React, {createContext} from 'react'

import { useInView } from '@/libs/react-intersection-observer'

import type { ImgixPictureProps } from './type'

export const RefContext = createContext(false)
export const ImgixPicture: React.FC<ImgixPictureProps> = ({ children, ...props }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	return (
		<picture ref={ref} {...props}>
			<RefContext.Provider value={inView}>{children}</RefContext.Provider>
		</picture>
	)
}
