import { InnerLinkProps } from '@/components/ui/link/InnerLink/type'

export type PaginationLinkProps = InnerLinkProps & {
	current?: boolean
	isDisabled?: boolean
	tabIndex?: number
}
