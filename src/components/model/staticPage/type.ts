import { Content } from 'newt-client-js'
export type Page = {
	pageName: string
	slug: string
	meta: {
		title: string
		description: string
		ogImage: {
			_id: string
			src: string
			fileType: 'image/png'
			fileSize: number
			fileName: string
			width: number
			height: number
		}
	}
	sections: [
		{
			_id: string
			type: 'Hero'
			data: {
				shoulderCopy: string
				titleCopy: string
				string: string
				backgroundImage: {
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
	]
	parent: PageContent
}

export type PageContent = Page & Content
