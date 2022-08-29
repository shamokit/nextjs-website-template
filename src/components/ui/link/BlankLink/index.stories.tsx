// BlankLink.stories.ts|tsx

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BlankLink } from '@/components/ui/link/BlankLink/index'

export default {
	title: 'BlankLink',
	component: BlankLink,
} as ComponentMeta<typeof BlankLink>

export const Primary: ComponentStory<typeof BlankLink> = () => {
	return (
		<BlankLink href={'/'}>
			<p>BlankLink</p>
		</BlankLink>
	)
}
