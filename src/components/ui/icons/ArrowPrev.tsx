type ArrowPrevProps = {
	className?: string
}
export const ArrowPrev: React.FC<ArrowPrevProps> = ({className}) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={["fill-current", className].join(' ')}>
			<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
		</svg>
	)
}
