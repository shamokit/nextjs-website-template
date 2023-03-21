import React, { forwardRef, useRef, useState } from 'react'

import { useIsomorphicEffect } from '@/utils/useIsomorphicEffect'
import { useResizeObserver } from '@/utils/useResizeObserver'

import type { TabProps } from './type'

export const Tab = forwardRef<HTMLDetailsElement, TabProps>(
	(
		{
			index,
			activeFirst = false,
			className,
			title,
			children,
			onClick: onClickHandler,
			onKeyUp: onKeyupHandler,
			onToggle,
		},
		ref
	) => {
		const detailsRef = useRef<HTMLDetailsElement | null>(null)
		const details = detailsRef.current
		const summary = details?.firstElementChild as HTMLElement | null
		const detailsContent = summary?.nextElementSibling as HTMLElement | null
		const [height, setHeight] = useState(0)
		const [, resizeHeight] = useResizeObserver(detailsContent)
		const isomorphicEffect = useIsomorphicEffect()
		isomorphicEffect(() => {
			if (detailsRef.current?.open && summary) {
				const summaryHeight = summary.getBoundingClientRect().height ?? 0
				setHeight(summaryHeight + resizeHeight)
			}
		}, [summary, resizeHeight])
		isomorphicEffect(() => {
			activeFirst
				? detailsRef.current?.setAttribute('open', '')
				: detailsRef.current?.removeAttribute('open')
		}, [activeFirst])
		const onToggleHandler = (
			e: React.SyntheticEvent<HTMLDetailsElement, Event>,
			index: number
		) => {
			onToggle?.(e, index)
			if (!(details && summary && detailsContent)) return
			const summaryHeight = summary.getBoundingClientRect().height ?? 0
			if (detailsRef.current?.open) {
				const contentHeight = detailsContent.getBoundingClientRect().height ?? 0
				setHeight(summaryHeight + contentHeight)
			} else {
				setHeight(summaryHeight)
			}
		}
		return (
			<details
				ref={detailsRef}
				className="group"
				onToggle={(e) => onToggleHandler?.(e, index)}
				style={{ height: `${height}px` }}
			>
				<summary
					ref={ref}
					onClick={(e) => onClickHandler?.(e, index)}
					onKeyUp={(e) => onKeyupHandler?.(e, index)}
					className={className}
				>
					{title}
				</summary>
				<div className="absolute left-0 right-0">{children}</div>
			</details>
		)
	}
)
Tab.displayName = 'TabComponent'
