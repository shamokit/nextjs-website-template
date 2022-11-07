type ArrowPrevProps = {
	className?: string
}
export const ArrowPrev: React.FC<ArrowPrevProps> = ({ className }) => {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={['fill-current', className].join(' ')}
		>
			<use xlinkHref="#icoArrowPrev"></use>
		</svg>
	)
}
