import { useState } from 'react'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'

export const useResizeObserver = (el?: HTMLElement | null): [number, number] => {
	const isomorphicEffect = useIsomorphicEffect()
	const [size, setSize] = useState([0, 0])
	isomorphicEffect(() => {
		const updateSize = () => {
			if(!el) return
			const rect = el.getBoundingClientRect()
			setSize([rect.width, rect.height])
		}
		const resizeObserver = new ResizeObserver(() => updateSize())
		resizeObserver.observe(document.body)
		return () => resizeObserver.disconnect()
	}, [el])
	return [size[0], size[1]]
}
