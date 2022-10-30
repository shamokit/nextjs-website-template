import type { RefObject, Dispatch, SetStateAction } from 'react'
import { useState } from 'react'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'
export type Timing = {
	duration: number
	easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
}
type UseToggle = (
	accordionRef: RefObject<HTMLDivElement | HTMLDetailsElement> | null,
	accordionContentRef: RefObject<HTMLDivElement> | null,
	initialValue?: boolean,
	animation?: boolean,
	animationTimingOpen?: Timing,
	animationTimingClose?: Timing,
	animationAction?: {
		beforeOpen?: () => unknown
		beforeClose?: () => unknown
		afterOpen?: () => unknown
		afterClose?: () => unknown
	}
) => [
	boolean,
	Dispatch<SetStateAction<boolean>>,
	(e: React.MouseEvent<HTMLElement, MouseEvent>) => void
]
const animationTimingDefault = Object.freeze({
	duration: 300,
	easing: 'ease-in-out',
})
/**
 * トグル
 * <details ref={accordionRef}>
 * 	<summary onClick={(e) => doAccordion(e)}>{title}</summary>
 * 	<div ref={accordionContentRef} className="overflow-hidden">
 * 		{children}
 * 	</div>
 * </details>
 * @param accordionRef トグルラッパー（details or div）
 * @param accordionContentRef トグルコンテンツ
 * @param initialValue 開閉初期値
 * @param animation アニメーションさせるかどうか
 * @param animationTimingOpen アニメーションの秒数とeasing
 * @param animationAction トグルの前後に処理する関数
 * @return [open, setOpen, onClickAction]
 */
export const useToggle: UseToggle = (
	accordionRef = null,
	accordionContentRef = null,
	initialValue = false,
	animation = true,
	animationTimingOpen = animationTimingDefault,
	animationTimingClose = animationTimingDefault,
	animationAction = {
		beforeOpen: undefined,
		beforeClose: undefined,
		afterOpen: undefined,
		afterClose: undefined,
	}
) => {
	const isomorphicEffect = useIsomorphicEffect()
	const [open, setOpen] = useState(initialValue)
	const { beforeOpen, beforeClose, afterOpen, afterClose } = animationAction
	isomorphicEffect(() => {
		// TODO::accordionRefがない時はaria属性で開閉の属性をつける
		if (!accordionRef) return
		open && accordionRef.current?.setAttribute('open', '')
	}, [])
	const actionBeforeToggle = () => (open ? beforeClose?.() : beforeOpen?.())
	const actionAfterToggle = () => {
		open ? afterClose?.() : afterOpen?.()
	}

	/**
	 * アコーディオンを閉じるときのキーフレーム
	 */
	const closingAnimKeyframes = (content: RefObject<HTMLDivElement>) => [
		{
			height: `${content.current?.offsetHeight ?? 0}px`,
			opacity: 1,
		},
		{
			height: 0,
			opacity: 0,
		},
	]

	/**
	 * アコーディオンを開くときのキーフレーム
	 */
	const openingAnimKeyframes = (content: RefObject<HTMLDivElement>) => [
		{
			height: 0,
			opacity: 0,
		},
		{
			height: `${content.current?.offsetHeight ?? 0}px`,
			opacity: 1,
		},
	]

	const closingAnimation = (content: RefObject<HTMLDivElement>) => {
		if (!content.current) return
		const anim = content.current.animate(
			closingAnimKeyframes(content),
			animationTimingClose
		)
		anim.onfinish = () => {
			setOpen(false)
			actionAfterToggle()
			if (!accordionRef) return
			accordionRef.current?.removeAttribute('open')
		}
	}

	const openingAnimation = (content: RefObject<HTMLDivElement>) => {
		if (!content.current) return
		if (!accordionRef) return
		accordionRef.current?.setAttribute('open', '')
		setOpen(true)
		const anim = content.current.animate(
			openingAnimKeyframes(content),
			animationTimingOpen
		)
		anim.onfinish = () => {
			actionAfterToggle()
		}
	}

	/**
	 * アニメーションありでアコーディオンを実行します。
	 */
	const doToggleWithAnimation = () => {
		if (!accordionContentRef) return
		open ? closingAnimation(accordionContentRef) : openingAnimation(accordionContentRef)
	}

	/**
	 * アニメーションなしでアコーディオンを実行します。
	 */
	const doToggleWithoutAnimation = () => {
		if (!accordionRef) return
		open
			? (setOpen(false), accordionRef.current?.removeAttribute('open'))
			: (accordionRef.current?.setAttribute('open', ''), setOpen(true))
	}

	/**
	 * アコーディオンを実行します。
	 */
	const doAccordion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()
		actionBeforeToggle()
		animation
			? doToggleWithAnimation()
			: (doToggleWithoutAnimation(), actionAfterToggle())
	}
	return [open, setOpen, doAccordion]
}
