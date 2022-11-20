import { useRef } from 'react'
import { useFocusTrap } from '@/utils/useFocusTrap'
import { tabbable } from '@/libs/tabbable'
export type FocusTrapProps = {
	id: string
	children: React.ReactNode
	isOpen: boolean
	className?: string
	clickOutsideDeactivates?: boolean
	onClose: () => void
}
export const FocusTrap: React.FC<FocusTrapProps> = ({
	id,
	children,
	isOpen,
	className,
	clickOutsideDeactivates = true,
	onClose,
}) => {
	const ref = useRef<HTMLDivElement>(null)
	useFocusTrap({ ref, isOpen, onClose, clickOutsideDeactivates })
	const onFocusHandler = () => {
		if (!ref.current) return
		// 最後のdivにfocusしたら最初のfocusableな要素にフォーカスを移す
		const tabbables = tabbable(ref.current)
		tabbables[0]?.focus()
	}
	return (
		<div
			ref={ref}
			id={id}
			aria-hidden={!isOpen}
			className={!isOpen ? `invisible ${className}` : className}
		>
			{children}
			<div tabIndex={0} onFocus={() => onFocusHandler()} />
		</div>
	)
}
