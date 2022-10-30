import { InnerLinkProps } from '@/components/ui/link/InnerLink'
export type PaginationLinkProps = InnerLinkProps & { current?: boolean, isDisabled?: boolean, tabIndex?: number }
