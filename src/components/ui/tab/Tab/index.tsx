import React, { useState } from 'react'

export const Tab: React.FC<{ activeFirst: string; children: React.ReactNode }> = ({
	activeFirst,
	children,
}) => {
	const [active, setActive] = useState(activeFirst)
	return <>{children}</>
}
