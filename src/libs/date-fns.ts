import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

type TypeProps = {
	dateString: string | Date
}
// TODO:timeタグorその他のタグで表示するコンポーネントを作成する
export const formatDate = ({ dateString }: TypeProps) => {
	const date = new Date(dateString)
	const dateText = format(utcToZonedTime(date, 'Asia/Tokyo'), 'yyyy-MM-dd')
	return dateText
}
