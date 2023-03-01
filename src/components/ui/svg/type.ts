import { iconNames } from './const'
export type SvgList = {
	[key: string]: {
		viewBox: string
		paths: string
	}
}
export type SvgNames = (typeof iconNames)[number]
