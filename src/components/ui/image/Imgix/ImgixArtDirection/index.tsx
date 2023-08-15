"use client";

import React, { ReactElement } from 'react'

import type { ImgixImgPropsWithoutMedia } from '@/components/ui/image/Imgix/ImgixImage/type'
import { ImgixPicture } from '@/components/ui/image/Imgix/ImgixPicture'
import { ImgixSourcePropsWithMedia } from '@/components/ui/image/Imgix/ImgixSource/type'

import type { ImgixArtDirectionProps } from './type'

/**
 * @param children - 各ブレイクポイントで読み込む画像をそれぞれのブレイクポイントごとにImgixSourceWithMediaコンポーネントで指定します。
 * 一番小さいサイズの画像はImgixStaticImageに指定します。
 * 指定するパスはいずれもimgixの画像のパスです。
 * @return アートディレクション画像を遅延読み込みして表示します。サイズが違うだけの場合はImgixStaticImageコンポーネントを使用してください。
 */
export const ImgixArtDirection: React.FC<
	ImgixArtDirectionProps & {
		children: [
			ReactElement<ImgixSourcePropsWithMedia>,
			...ReactElement<ImgixSourcePropsWithMedia>[],
			ReactElement<ImgixImgPropsWithoutMedia>
		]
	}
> = ({ children, ...props }) => {
	return <ImgixPicture {...props}>{children}</ImgixPicture>
}
