import React, { ReactElement } from 'react'
import type { ImgixArtDirectionProps } from './type'
import type { StaticImageProps } from '@/components/ui/image/StaticImage/type'
import { ImgixSourceWithMediaProps } from '@/components/ui/image/Imgix/ImgixSource/type'
/**
 * @param children - 各ブレイクポイントで読み込む画像をそれぞれのブレイクポイントごとにSourceWithMediaコンポーネントで指定します。
 * 一番小さいサイズの画像はStaticImageに指定します。
 * 指定するパスはいずれもpublic/imagesフォルダ内のpngもしくはjpgの画像のパスです。
 * @return アートディレクション画像を遅延読み込みして表示します。サイズが違うだけの場合はPictureコンポーネントを使用してください。
 */
export const ImgixArtDirection: React.FC<
	ImgixArtDirectionProps & {
		children: [
			ReactElement<ImgixSourceWithMediaProps>,
			...ReactElement<ImgixSourceWithMediaProps>[],
			ReactElement<StaticImageProps>
		]
	}
> = ({ children, ...props }) => {
	return <picture {...props}>
		{children}
	</picture>
}
