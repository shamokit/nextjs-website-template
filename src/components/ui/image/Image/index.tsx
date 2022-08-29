import React from 'react'
import { useInView } from 'react-intersection-observer'
import classnames from 'classnames'
import { TRANSPARENT_DUMMY_IMAGE } from '@/lib/const'
export type ImageProps = {
	width: number
	height: number
	sm: string
	md: string
	lg?: string
	alt?: string
	loading?: boolean
	className?: {
		picture?: string
		img?: string
	}
}
export const Image: React.FC<ImageProps> = ({
	width,
	height,
	sm,
	md,
	lg,
	alt,
	loading = true,
	className,
}) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	})

	return (
		<>
			<picture ref={ref} className={classnames([className?.picture, 'bg-primary-500'])}>
				{lg && (
					<source
						srcSet={!loading ? lg : inView ? lg : TRANSPARENT_DUMMY_IMAGE}
						media="(min-width: 1100px)"
					/>
				)}
				<source
					srcSet={!loading ? md : inView ? md : TRANSPARENT_DUMMY_IMAGE}
					media="(min-width: 768px)"
				/>
				<img
					src={!loading ? sm : inView ? sm : TRANSPARENT_DUMMY_IMAGE}
					alt={alt ?? ''}
					width={width}
					height={height}
					className={classnames([className?.img])}
				/>
			</picture>
		</>
	)
}
