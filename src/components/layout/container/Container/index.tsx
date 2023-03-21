import classnames from 'classnames'

import { ExhaustiveError } from '@/utils/ExhaustiveError'

import type { ContainerProps, ContainerSizeList } from './type'

export const Container: React.FC<ContainerProps> = ({
	children,
	className,
	size = 'default',
	withDefaultPaddingSide = true,
}) => {
	const containerSize = (size: ContainerSizeList) => {
		switch (size) {
			case 'full':
				return `w-full${withDefaultPaddingSide && ' px-[var(--contents--padding--side)'}]`
			case 'large':
				return `max-w-[var(--contents--width--large)]${
					withDefaultPaddingSide && ' px-[var(--contents--padding--side)]'
				}`
			case 'default':
				return `max-w-[var(--contents--width)]${
					withDefaultPaddingSide && ' px-[var(--contents--padding--side)]'
				}`
			default:
				throw new ExhaustiveError(size)
		}
	}
	const containerClass = containerSize(size)
	return <div className={classnames([containerClass, className])}>{children}</div>
}
