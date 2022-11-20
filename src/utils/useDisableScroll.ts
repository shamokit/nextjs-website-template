import { RefObject, useEffect } from 'react'
import { clearAllBodyScrollLocks, disableBodyScroll } from '@/libs/body-scroll-lock'
type UseDisableScrollProps = { ref: RefObject<HTMLElement>; isOpen: boolean }
export const useDisableScroll = ({ ref, isOpen }: UseDisableScrollProps): void => {
	useEffect(() => {
		if (!isOpen || ref.current === null) {
			return
		}
		disableBodyScroll(ref.current)
		return clearAllBodyScrollLocks
	}, [ref, isOpen])
}
