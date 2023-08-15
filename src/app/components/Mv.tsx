import { SimpleMainVisual } from '@/components/layout/mainVisual/SimpleMainVisual'
import { ImgixImage } from '@/components/ui/image/Imgix/ImgixImage'
import { ImgixArtDirection } from '@/components/ui/image/Imgix/ImgixArtDirection'
import { ImgixSourceWithMedia } from '@/components/ui/image/Imgix/ImgixSource'

export const Mv = () => {
	return (
		<SimpleMainVisual
			title={'TOP'}
			copy={
				'microCMSを使用し、<br>Cloudflare PagesでWebサイトをデプロイするテンプレートです。'
			}
		>
			<ImgixArtDirection className="col-start-1 col-end-1 row-start-1 row-end-1">
				<ImgixSourceWithMedia
					mediaSize="lg"
					srcSet="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/2bedd8d6b0804ceebc0d869420fa7421/Group%202.png"
					width={600}
					height={800}
					imgixParam={{ fit: 'clamp', w: 1600, arrowLow: true }}
					preload={true}
				/>
				<ImgixSourceWithMedia
					mediaSize="md"
					srcSet="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/51e82c8af3bf4e9a8b50f31067b7530a/Group%201.png"
					width={800}
					height={600}
					imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
					preload={true}
				/>
				<ImgixImage
					src="https://images.microcms-assets.io/assets/ea2e00f4ba464694b03f8817bee4605d/5b10d44c214143e2886052d7f3c2a797/icon_fill.png"
					width={800}
					height={800}
					alt=""
					imgixParam={{ fit: 'crop', w: 1600, h: 800, arrowLow: true }}
					preload={true}
				/>
			</ImgixArtDirection>
		</SimpleMainVisual>
	)
}
