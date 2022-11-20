type ArrowLastProps = {
	className?: string
}
export const ArrowLast: React.FC<ArrowLastProps> = ({ className }) => {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={['fill-current', className].join(' ')}
		>
			<use href="#icoArrowLast"></use>
		</svg>
	)
}
