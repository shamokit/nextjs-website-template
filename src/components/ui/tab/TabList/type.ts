import type { TabProps } from '@/components/ui/tab/Tab/type'

export type TabListProps = {
	className?: string
	tabClassName?: string
	ariaLabel: string
	children: React.ReactElement<TabProps>[]
}
