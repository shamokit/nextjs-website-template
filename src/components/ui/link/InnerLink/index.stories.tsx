// Link.stories.ts|tsx
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InnerLink } from '@/components/ui/link/InnerLink/index'

export default {
	title: 'InnerLink',
	component: InnerLink,
} as ComponentMeta<typeof InnerLink>

export const Primary: ComponentStory<typeof InnerLink> = () => (
	<InnerLink href={'/'}>InnerLink</InnerLink>
)
