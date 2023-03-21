import type { ErrorMessageProps } from './type'

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, tag = 'p' }) => {
	const Tag = tag
	return <Tag role="alert">{children}</Tag>
}
