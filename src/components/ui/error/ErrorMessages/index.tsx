import React from 'react'
import { ErrorMessage } from '../ErrorMessage/index'
import type { ErrorMessagesProps } from './type'
export const ErrorMessages: React.FC<ErrorMessagesProps> = ({ errors, classNames }) => {
	if (!errors) return null
	if (Array.isArray(errors)) {
		return (
			<ul className={classNames ?? undefined}>
				{errors.map((child) => (
					<ErrorMessage key={child.toString()} tag="li">
						<>{child}</>
					</ErrorMessage>
				))}
			</ul>
		)
	}
	return <ErrorMessage>{errors}</ErrorMessage>
}
