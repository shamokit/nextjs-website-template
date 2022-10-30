import { useBudouX } from '@/components/lib/useBudouX'
type OwnProps<E extends React.ElementType> = {
  text: string;
  as?: E;
}
type TextProps<E extends React.ElementType> = OwnProps<E> &
  Omit<React.ComponentProps<E>, keyof OwnProps<E>>;

export const Text = <E extends React.ElementType = "span">({ as, text }: TextProps<E>) => {
	const { parse } = useBudouX()
	const Tag = as || 'span'
	return <Tag dangerouslySetInnerHTML={{ __html: parse(text) }} />
}
