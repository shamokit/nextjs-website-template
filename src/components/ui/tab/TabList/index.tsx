import React, { useState, useEffect, useId } from 'react'
export const TabList: React.FC<{
	className?: string
	tabClassName?: string
	ariaLabel: string
	titles: React.ReactNode[]
	activeIndex?: number
	children: React.ReactNode[]
}> = ({ className, tabClassName, ariaLabel, titles, activeIndex = 0, children }) => {
	const id = useId()
	const [activeTab, toggleActiveTab] = useState(activeIndex)
	const onKeyupHandler = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
		const key = e.key
		const next = index + 1 === titles.length ? 0 : index + 1
		const prev = index === 0 ? titles.length - 1 : index - 1
		switch (key) {
			case 'ArrowRight':
				document
					.querySelector<HTMLDetailsElement>(
						`[aria-label="${ariaLabel}"] details[id="${id}${next}"] summary`
					)
					?.focus()
				toggleActiveTab(next)
				break
			case 'ArrowLeft':
				document
					.querySelector<HTMLDetailsElement>(
						`[aria-label="${ariaLabel}"] details[id="${id}${prev}"] summary`
					)
					?.focus()
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
	// TODO:resizeObserverの追加 heightの再計算が必要
	useEffect(() => {
		document
			.querySelectorAll(`[aria-label="${ariaLabel}"] details`)
			.forEach((item, index) => {
				const currentItem = item as HTMLDetailsElement
				currentItem.removeAttribute('open')
				currentItem.removeAttribute('style')
				if (index === activeTab) {
					currentItem.setAttribute('open', '')
					const setHeight = (currentItem: HTMLDetailsElement) => {
						const summarySelector = `[aria-label="${ariaLabel}"] details[id="${id}${activeTab}"] summary`
						const summaryHeight =
							document.querySelector(summarySelector)?.getBoundingClientRect().height ?? 0
						const contentHeight =
							document.querySelector(`${summarySelector} + *`)?.getBoundingClientRect()
								.height ?? 0
						currentItem.style.height = `${summaryHeight + contentHeight}px`
					}
					setHeight(currentItem)
				}
			})
	}, [id, ariaLabel, activeTab])
	return (
		<ul aria-label={ariaLabel} className={`relative flex gap-2 ${className}`}>
			{titles.map((title, index) => {
				return (
					<li key={`${title}${index}`}>
						<details
							id={`${id}${index}`}
							className="group"
							onToggle={(e) => onToggleHandler(e, index)}
						>
							<summary
								onClick={(e) => onClickHandler(e, index)}
								onKeyUp={(e) => onKeyupHandler(e, index)}
								className={`block ${tabClassName}`}
							>
								{title}
							</summary>
							<div className="absolute left-0 right-0">{children[index]}</div>
						</details>
					</li>
				)
			})}
		</ul>
	)
}
