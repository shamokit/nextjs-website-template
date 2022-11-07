type ArrowFirstProps = {
	className?: string
}
export const ArrowFirst: React.FC<ArrowFirstProps> = ({ className }) => {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={['fill-current', className].join(' ')}
		>
			<use xlinkHref="#icoArrowFirst"></use>
		</svg>
	)
}
