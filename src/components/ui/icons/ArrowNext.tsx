type ArrowNextProps = {
	className?: string
}
export const ArrowNext: React.FC<ArrowNextProps> = ({className}) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={["fill-current", className].join(' ')}><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
	)
}
