import React, { ReactElement } from 'react'
import type { StaticImageProps } from '@/components/ui/image/StaticImage/type'
import type { ArtDirectionProps } from '@/components/ui/image/ArtDirection/type'
import { SourceWithMediaProps } from '@/components/ui/image/Source/type'
/**
 * @param children - 各ブレイクポイントで読み込む画像をそれぞれのブレイクポイントごとにSourceWithMediaコンポーネントで指定します。
 * 一番小さいサイズの画像はStaticImageに指定します。
 * 指定するパスはいずれもpublic/imagesフォルダ内のpngもしくはjpgの画像のパスです。
 * @return アートディレクション画像を遅延読み込みして表示します。サイズが違うだけの場合はPictureコンポーネントを使用してください。
 */
export const ArtDirection: React.FC<
	ArtDirectionProps & {
		children: [
			ReactElement<SourceWithMediaProps>,
			...ReactElement<SourceWithMediaProps>[],
			ReactElement<StaticImageProps>
		]
	}
> = ({ children, ...props }) => {
	return <picture {...props}>
		{children}
	</picture>
}
