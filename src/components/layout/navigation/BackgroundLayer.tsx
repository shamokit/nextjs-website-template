import { useRef, useEffect } from 'react'
type NavigationLayerProps = {
	open: boolean
	close: VoidFunction
}
const fadeIn = [
	{ opacity: 1, visibility: 'visible' },
	{ opacity: 0 },
	{ opacity: 0, visibility: 'hidden' },
]
const fadeOut = [
	{ opacity: 0, visibility: 'hidden' },
	{ opacity: 0, visibility: 'visible' },
	{ opacity: 1 },
]
const animationOption: KeyframeAnimationOptions = {
	duration: 600,
	fill: 'both',
	easing: 'ease-out',
}
export const NavigationLayer: React.FC<NavigationLayerProps> = ({ open, close }) => {
	const renderFlgRef = useRef(true)
	const layer = useRef<HTMLDivElement>(null)
	const handleOnClick = () => {
		close()
	}
	useEffect(() => {
		renderFlgRef.current = true
	}, [])
	useEffect(() => {
		if (renderFlgRef.current) {
			renderFlgRef.current = false
		} else {
			if (!layer.current) {
				return
			}
			if (open) {
				layer.current.animate(fadeOut, animationOption)
			} else {
				layer.current.animate(fadeIn, animationOption)
			}
		}
	}, [open])

	return (
		<>
			<div
				className={`fixed inset-0 z-10 bg-black text-white${
					open ? ' visible' : ' invisible'
				}`}
				onClick={() => handleOnClick()}
				ref={layer}
			/>
		</>
	)
}
