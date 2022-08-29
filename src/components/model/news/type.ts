export type News = {
	title: string
	slug: string
	body: string
	meta?: {
		title?: string
		description?: string
		ogImage?: {
			_id: string
			src: string
			fileType: 'image/png'
			fileSize: number
			fileName: string
			width: number
			height: number
		}
	}
}
