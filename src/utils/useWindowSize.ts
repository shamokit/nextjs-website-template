import { useState } from 'react'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'
/**
 * windowの横幅を取得して返します。
 */
export const useWindowSize = (): number => {
	const isomorphicEffect = useIsomorphicEffect()
	const [size, setSize] = useState(0)
	isomorphicEffect(() => {
		const updateSize = () => {
			setSize(window.innerWidth)
		}
		const resizeObserver = new ResizeObserver(() => updateSize())
		resizeObserver.observe(document.body)
		return () => resizeObserver.disconnect()
	}, [])
	return size
}
