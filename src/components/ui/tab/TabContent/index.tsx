import React from "react"

export const TabContent: React.FC<{children: React.ReactNode}> = ({children}) => {
	return (
		<div id="panel-1" role="tabpanel" tabIndex={0} aria-labelledby="tab-1">
			{children}
		</div>
	)
}
