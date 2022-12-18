import React from 'react'
import type { ImgixPictureProps } from './type'
import { useInView } from '@/libs/react-intersection-observer'
export const RefContext = React.createContext(false)
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
