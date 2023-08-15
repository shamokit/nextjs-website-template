"use client";

import React, {createContext} from 'react'

import { useInView } from '@/libs/react-intersection-observer'

import type { PictureProps } from './type'

export const RefContext = createContext(false)
export const Picture: React.FC<PictureProps> = ({ children, ...props }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})
	return (
		<picture ref={ref} {...props}>
			<RefContext.Provider value={inView}>{children}</RefContext.Provider>
		</picture>
	)
}
