import { ReactNode } from 'react'
import type { Timing } from '@/utils/useToggle'
export type AccordionProps = {
	title: ReactNode
	children: ReactNode
	className?: string
	openDefault?: boolean
	animation?: boolean
	animationTimingOpen?: Timing
	animationTimingClose?: Timing
	animationAction?: {
		beforeOpen?: () => unknown
		beforeClose?: () => unknown
		afterOpen?: () => unknown
		afterClose?: () => unknown
	}
}
