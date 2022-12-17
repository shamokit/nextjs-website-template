import { useState } from 'react'
import type { RefObject } from 'react'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'
import { animationTimingDefault } from '@/utils/animation'
type Timing = {
	duration: number
	easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
}
export type ToggleAnimation = {
	timingOpen?: Timing
	timingClose?: Timing
	actions?: {
		beforeOpen?: () => unknown
		beforeClose?: () => unknown
		afterOpen?: () => unknown
		afterClose?: () => unknown
	}
}
export type UseToggleProps = {
	accordionRef: RefObject<HTMLButtonElement | HTMLDetailsElement> | null
	accordionContentRef: RefObject<HTMLDivElement> | null
	initialValue?: boolean
	animation?: ToggleAnimation | false
}
type UseToggle = (
	args: UseToggleProps
) => [boolean, (e: React.MouseEvent<HTMLElement, MouseEvent>) => void]

/**
 * トグル
 * 基本的にはトグルはdetailsタグで実装ください。Accordionコンポーネントで使用しています。
 * detailsタグを使用しない場合はこのフックを以下のように使用します。
 * <button ref={accordionRef} aria-controls="targetId" aria-expanded={open} onClick={(e) => doAccordion(e)}>text</button>
 * <div ref={accordionContentRef} id="targetId" className="overflow-hidden">
 * 	{children}
 * </div>
 * @props accordionRef details or buttonのref
 * @props accordionContentRef トグルコンテンツ
 * @props initialValue 開閉初期値
 * @props animation.timingOpen Openアニメーションの秒数とeasing
 * @props animation.timingClose Closeアニメーションの秒数とeasing
 * @props animation.actions トグルの前後に処理する関数のオブジェクト
 * @return [open, doAnimation]
 */
export const useToggle: UseToggle = ({
	accordionRef = null,
	accordionContentRef = null,
	initialValue = false,
	animation = {
		timingOpen: animationTimingDefault,
		timingClose: animationTimingDefault,
		actions: undefined,
	},
}) => {
	const isomorphicEffect = useIsomorphicEffect()
	const [open, setOpen] = useState(initialValue)
	const setHeightZero = () =>
		accordionContentRef?.current?.setAttribute('style', 'height: 0px')
	const setHTMLAttributeOpen = () => accordionRef?.current?.setAttribute('open', '')
	const removeHTMLAttributeOpen = () => accordionRef?.current?.removeAttribute('open')
	const removeHTMLAttributeStyle = () =>
		accordionContentRef?.current?.removeAttribute('style')
	/**
	 * ctrl + Fで検索した時detailsタグにopen属性が自動でつきます。
	 * stateとずれるので補正します。
	 */
	const correctAttributeOpen = () => {
		if (accordionRef?.current?.tagName !== 'DETAILS') return
		const htmlAttributeOpen = accordionRef?.current?.getAttribute('open')
		open.toString() !== htmlAttributeOpen &&
			setOpen(htmlAttributeOpen === '' ? true : false)
	}
	isomorphicEffect(() => {
		if (!accordionRef) return
		if (!accordionContentRef) return
		if (accordionRef.current?.tagName === 'DETAILS') {
			open && setHTMLAttributeOpen()
		} else {
			accordionContentRef.current?.setAttribute('aria-hidden', `${!open}`)
		}
		accordionRef?.current?.addEventListener('toggle', () => correctAttributeOpen())
		return accordionRef?.current?.removeEventListener('toggle', () =>
			correctAttributeOpen()
		)
	}, [])
	isomorphicEffect(() => {
		if (!accordionRef) return
		if (!accordionContentRef) return
		accordionRef.current?.tagName !== 'DETAILS' &&
			!open &&
			(setHeightZero(),
			accordionContentRef.current?.setAttribute('aria-hidden', `${!open}`))
		!animation && open && removeHTMLAttributeStyle()
	}, [open])

	/** トグル前に処理を挟みます */
	const actionBeforeToggle = () => {
		if (!animation) return
		open ? animation.actions?.beforeClose?.() : animation.actions?.beforeOpen?.()
	}
	/** トグルアニメーション後に処理を挟みます */
	const actionAfterToggle = () => {
		if (!animation) return
		open ? animation.actions?.afterClose?.() : animation.actions?.afterOpen?.()
	}

	/** アコーディオンを閉じるときのキーフレーム */
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

	/** アコーディオンを開くときのキーフレーム */
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

	/** アコーディオンを閉じるアニメーション */
	const closingAnimation = (content: RefObject<HTMLDivElement>) => {
		if (!animation) return
		if (!content.current) return
		const anim = content.current.animate(
			closingAnimKeyframes(content),
			animation.timingClose
		)
		anim.onfinish = () => {
			accordionRef?.current?.tagName !== 'DETAILS' && setHeightZero()
			// アニメーションをする場合open属性はアニメーション後に消す必要がある
			setOpen(false)
			actionAfterToggle()
			if (!accordionRef) return
			accordionRef.current?.tagName === 'DETAILS' && removeHTMLAttributeOpen()
		}
	}

	/** アコーディオンを開くアニメーション */
	const openingAnimation = (content: RefObject<HTMLDivElement>) => {
		if (!animation) return
		if (!content.current) return
		if (!accordionRef) return
		accordionRef.current?.tagName === 'DETAILS' && setHTMLAttributeOpen()
		accordionRef.current?.tagName !== 'DETAILS' &&
			content.current?.setAttribute('aria-hidden', 'false'),
			removeHTMLAttributeStyle()
		// アニメーションをする場合open属性は先につける必要がある
		setOpen(true)
		const anim = content.current.animate(
			openingAnimKeyframes(content),
			animation.timingOpen
		)
		anim.onfinish = () => {
			accordionRef.current?.tagName !== 'DETAILS' && removeHTMLAttributeStyle()
			actionAfterToggle()
		}
	}

	/** アニメーションありでアコーディオンを実行します。 */
	const doToggleWithAnimation = () => {
		if (!accordionContentRef) return
		open ? closingAnimation(accordionContentRef) : openingAnimation(accordionContentRef)
	}

	/** アニメーションなしでアコーディオンを実行します。 */
	const doToggleWithoutAnimation = () => {
		if (!accordionRef) return
		if (accordionRef.current?.tagName !== 'DETAILS') {
			setOpen(!open)
			return
		}
		open
			? (setOpen(false), removeHTMLAttributeOpen())
			: (setHTMLAttributeOpen(), setOpen(true))
	}

	/** アコーディオンを実行します。 */
	const doAccordion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()
		actionBeforeToggle()
		animation
			? doToggleWithAnimation()
			: (doToggleWithoutAnimation(), actionAfterToggle())
	}
	return [open, doAccordion]
}
