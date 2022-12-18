import React, { useState, useRef, useEffect, createRef } from 'react'
import type { TabListProps } from './type'
import { Tab } from '@/components/ui/tab/Tab'
export const TabList: React.FC<TabListProps> = ({
	className,
	tabClassName,
	ariaLabel,
	children,
}) => {
	const firstIndex = 0
	const [lastIndex, setLastIndex] = useState(0)
	const [activeTab, toggleActiveTab] = useState(0)
	const refs = useRef<React.RefObject<HTMLDetailsElement>[]>([])
	useEffect(() => {
		children.forEach((_, index) => {
			refs.current[index] = createRef<HTMLDetailsElement>()
		})
		setLastIndex(children.length - 1)
	}, [children])
	const onKeyupHandler = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
		const key = e.key
		const next = index === lastIndex ? firstIndex : index + 1
		const prev = index === firstIndex ? lastIndex : index - 1
		const nextTab = refs.current[next].current
		const prevTab = refs.current[prev].current
		switch (key) {
			case 'ArrowRight':
				nextTab?.focus()
				toggleActiveTab(next)
				break
			case 'ArrowLeft':
				prevTab?.focus()
				toggleActiveTab(prev)
				break
			default:
				break
		}
	}
	const onClickHandler = (e: React.MouseEvent, index: number) => {
		e.preventDefault()
		toggleActiveTab(index)
	}
	const onToggleHandler = (
		e: React.SyntheticEvent<HTMLDetailsElement, Event>,
		index: number
	) => e.currentTarget.open && toggleActiveTab(index)
	useEffect(() => {
		children.forEach((_, index) => {
			const summary = refs.current[index].current
			const details = summary?.parentElement as HTMLDetailsElement | null
			const detailsContent = summary?.nextElementSibling
			if (!(summary && details && detailsContent)) return
			details.removeAttribute('open')
			if (index === activeTab) {
				details.setAttribute('open', '')
			}
		})
	}, [activeTab, children])
	return (
		<ul aria-label={ariaLabel} className={`relative flex gap-4 ${className}`}>
			{children.map(({ props: { activeFirst, title, children } }, index) => {
				return (
					<li key={`${title?.toString()}${index}`}>
						<Tab
							ref={refs.current[index]}
							index={index}
							activeFirst={activeFirst}
							title={title}
							onToggle={(e) => onToggleHandler(e, index)}
							onClick={(e) => onClickHandler(e, index)}
							onKeyUp={(e) => onKeyupHandler(e, index)}
							className={`block ${tabClassName}`}
						>
							{children}
						</Tab>
					</li>
				)
			})}
		</ul>
	)
}
