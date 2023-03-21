import React from 'react'

import type { PaginationItemsProps } from './type'

export const PaginationItems: React.FC<PaginationItemsProps> = ({ children }) => {
	const renderChildren = children.filter((v) => v)
	return (
		<>
			{renderChildren.map((child, index) => {
				return Array.isArray(child) ? (
					child.map((child, index) => <li key={`child${index}`}>{child}</li>)
				) : (
					<li key={index}>{child}</li>
				)
			})}
		</>
	)
}
