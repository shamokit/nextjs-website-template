import classnames from 'classnames'
const containerSizeList = ['full', 'large', 'default'] as const
type ContainerSizeList = typeof containerSizeList[number]
type ContainerProps = {
	children: React.ReactNode
	className?: string
	size?: ContainerSizeList
	withDefaultPaddingSide?: boolean
}
export const Container: React.FC<ContainerProps> = ({
	children,
	className,
	size = 'default',
	withDefaultPaddingSide = true,
}) => {
	const containerSize: {
		[key in ContainerSizeList]: string
	} = {
		full: `w-full${withDefaultPaddingSide && ' px-[var(--contents--padding--side)'}]`,
		large: `max-w-[var(--contents--width--large)]${
			withDefaultPaddingSide && ' px-[var(--contents--padding--side)]'
		}`,
		default: `max-w-[var(--contents--width)]${
			withDefaultPaddingSide && ' px-[var(--contents--padding--side)'
		}]`,
	}
	const containerClass = containerSize[size]

	return <div className={classnames([containerClass, className])}>{children}</div>
}
