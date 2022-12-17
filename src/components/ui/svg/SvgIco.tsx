import { icons } from './const'
import { capitalize } from '@/utils/capitalize'
import type { SvgNames } from './type'
type SvgIco = { name: SvgNames, className?: string }
export const SvgIco: React.FC<SvgIco> = ({ name, className }) => {
	const icon = icons[name]
	return (
		<svg viewBox={icon.viewBox} className={`fill-current ${className}`}>
			<use href={`#ico${capitalize(name)}`} />
		</svg>
	)
}
