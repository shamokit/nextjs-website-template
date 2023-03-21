import React from 'react'

import { capitalize } from '@/utils/capitalize'

import { iconNames, icons } from './const'

export const SVG = () => {
	return (
		<svg className="hidden">
			{iconNames.map((name) => {
				const { viewBox, paths } = icons[name]
				return (
					<symbol
						key={name}
						viewBox={viewBox}
						id={`ico${capitalize(name)}`}
						dangerouslySetInnerHTML={{ __html: paths }}
					></symbol>
				)
			})}
		</svg>
	)
}
