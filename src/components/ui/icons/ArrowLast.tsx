type ArrowLastProps = {
	className?: string
}
export const ArrowLast: React.FC<ArrowLastProps> = ({className}) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" className={["fill-current", className].join(' ')}><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></svg>
	)
}
