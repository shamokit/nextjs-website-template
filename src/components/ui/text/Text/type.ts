type OwnProps<E extends React.ElementType> = {
	text: string
	as?: E
	className?: string
}
export type TextProps<E extends React.ElementType> = OwnProps<E> &
	Omit<React.ComponentProps<E>, keyof OwnProps<E>>
