import type { NavigationButtonProps } from './type'
export const NavigationButton: React.FC<NavigationButtonProps> = ({
	idForAria,
	open,
	onClick,
}) => {
	return (
		<button
			type="button"
			className="fixed top-0 right-0 md:hidden w-11 h-11 grid place-content-center bg-primary-500 text-white"
			aria-controls={idForAria}
			aria-expanded={open}
			aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
			onClick={onClick}
		>
			<span
				className={`absolute left-3 w-[20px] border-b-2 border-current transition-transform${
					open ? ' top-5 rotate-45' : ' top-3'
				}`}
			></span>
			<span
				className={`absolute left-3 w-[20px] border-b-2 border-current transition-transform top-5${
					open ? ' opacity-0' : ''
				}`}
			></span>
			<span
				className={`absolute left-3 w-[20px] border-b-2 border-current transition-transform${
					open ? ' top-5 -rotate-45' : ' top-7'
				}`}
			></span>
		</button>
	)
}
