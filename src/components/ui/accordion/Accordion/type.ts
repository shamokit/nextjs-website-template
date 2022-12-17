import { ReactNode } from 'react'
import type { ToggleAnimation } from '@/utils/useToggle'
export type AccordionProps = {
	title: ReactNode
	children: ReactNode
	className?: string
	openDefault?: boolean
	animation?: ToggleAnimation
}
