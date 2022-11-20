import { RefObject } from 'react'
import { createFocusTrap } from '@/libs/focus-trap'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'

type UseFocusTrapOptions = {
	ref: RefObject<HTMLElement>
	isOpen: boolean
	onClose: () => void
	clickOutsideDeactivates?: boolean
}
export const useFocusTrap = ({
	ref,
	isOpen,
	onClose,
	clickOutsideDeactivates = true,
}: UseFocusTrapOptions): void => {
	const isomorphicEffect = useIsomorphicEffect()
	isomorphicEffect(() => {
		if (!isOpen || ref.current === null) {
			return
		}
		const trap = createFocusTrap(ref.current, {
			clickOutsideDeactivates: clickOutsideDeactivates,
			escapeDeactivates: true,
			returnFocusOnDeactivate: true,
			onDeactivate: onClose,
		})
		trap.activate()
		return () => {
			trap.deactivate()
		}
	}, [ref, isOpen, onClose])
}
