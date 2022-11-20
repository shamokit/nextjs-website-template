type ArrowNextProps = {
	className?: string
}
export const ArrowNext: React.FC<ArrowNextProps> = ({ className }) => {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={['fill-current', className].join(' ')}
		>
			<use href="#icoArrowNext"></use>
		</svg>
	)
}
