import React from "react"

export const TabButton: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<button type="button" role="tab" aria-selected="true" aria-controls="tabpanel-id" id="tab-id" tabIndex={0}>
			{children}
		</button>
	)
}
