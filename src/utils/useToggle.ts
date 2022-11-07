import { useState } from 'react'
import type { RefObject } from 'react'
import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'
import { animationTimingDefault } from '@/utils/const'
export type Timing = {
	duration: number
	easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
}
type UseToggle = (
	accordionRef: RefObject<HTMLButtonElement | HTMLDetailsElement> | null,
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
) => [boolean, (e: React.MouseEvent<HTMLElement, MouseEvent>) => void]

/**
 * トグル
 * Accordionコンポーネントで使用しています。detailsタグで実装する場合はそちらを使用ください。
 * detailsタグの使用をお勧めしますが、使用しない場合はこのフックを以下のように使用します。
 * <button ref={accordionRef} aria-controls="targetId" aria-expanded={open} onClick={(e) => doAccordion(e)}>text</button>
 * <div ref={accordionContentRef} id="targetId" className="overflow-hidden">
 * 	{children}
 * </div>
 * @param accordionRef details or buttonのref
 * @param accordionContentRef トグルコンテンツ
 * @param initialValue 開閉初期値
 * @param animation アニメーションさせるかどうか
 * @param animationTimingOpen Openアニメーションの秒数とeasing
 * @param animationTimingClose Closeアニメーションの秒数とeasing
 * @param animationAction トグルの前後に処理する関数のオブジェクト
 * @return [open, doAnimation]
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
	/** アニメーションのため、高さを0に指定します。 */
	const setZeroHeight = () =>
		accordionContentRef?.current?.setAttribute('style', 'height: 0px')
	/** open属性を付与します。 */
	const setHTMLAttributeOpen = () => accordionRef?.current?.setAttribute('open', '')
	/** open属性を取り除きます。 */
	const removeHTMLAttributeOpen = () => accordionRef?.current?.removeAttribute('open')
	/** style属性を取り除きます。 */
	const removeHTMLAttributeStyle = () =>
		accordionContentRef?.current?.removeAttribute('style')
	/** ctrl + Fで検索した時detailsタグはopen属性がつくのでstateとずれるのを補正します。 */
	const checkToggle = () => {
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

		// イベントリスナのsubscribeとunsubscribe
		accordionRef?.current?.addEventListener('toggle', () => checkToggle())
		return accordionRef?.current?.removeEventListener('toggle', () => checkToggle())
	}, [])
	isomorphicEffect(() => {
		if (!accordionRef) return
		if (!accordionContentRef) return
		accordionRef.current?.tagName !== 'DETAILS' &&
			!open &&
			(setZeroHeight(),
			accordionContentRef.current?.setAttribute('aria-hidden', `${!open}`))
		!animation && open && removeHTMLAttributeStyle()
	}, [open])
	/** トグル前に処理を挟みます */
	const actionBeforeToggle = () => (open ? beforeClose?.() : beforeOpen?.())
	/** トグルアニメーション後に処理を挟みます */
	const actionAfterToggle = () => (open ? afterClose?.() : afterOpen?.())

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
		if (!content.current) return
		const anim = content.current.animate(
			closingAnimKeyframes(content),
			animationTimingClose
		)
		anim.onfinish = () => {
			accordionRef?.current?.tagName !== 'DETAILS' && setZeroHeight()
			// アニメーションをする場合open属性はアニメーション後に消す必要がある
			setOpen(false)
			actionAfterToggle()
			if (!accordionRef) return
			accordionRef.current?.tagName === 'DETAILS' && removeHTMLAttributeOpen()
		}
	}

	/** アコーディオンを開くアニメーション */
	const openingAnimation = (content: RefObject<HTMLDivElement>) => {
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
			animationTimingOpen
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
