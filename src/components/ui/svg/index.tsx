import React from 'react'
import { icons, iconNames } from './const'
import { capitalize } from '@/utils/capitalize'
export const SVG = () => {
	return (
		<svg className="hidden">
			<>
				{iconNames.map((name) => {
					const {viewBox, paths} = icons[name]
					return (
						<symbol key={name} viewBox={viewBox} id={`ico${capitalize(name)}`} dangerouslySetInnerHTML={{__html: paths}}>
						</symbol>
					)
				})}
			</>
		</svg>
	)
}
