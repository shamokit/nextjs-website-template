export type Position = 'top' | 'left' | 'bottom' | 'right' | 'center'

/**
 * 【Clip】
 * 画像の縦横比を変えずにリサイズします。（元サイズより大きいサイズを指定すると荒れます）
 * w,hを両方指定した場合はそのサイズに画像が収まるように縮小されます。
 * 縮尺が1:1以外の場合は長いほうが優先されます。
 * 例）200×100の画像をw=100&h=100にした場合、画像サイズは100×50のようになります。
 * ?fit=clip&w=200 or ?fit=clip&h=200 or ?fit=clip&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#clip
 */
type ImgixParamClip = {
	fit: 'clip'
	arrowLow: boolean
	w?: number
	h?: number
}

/**
 * 【Clamp】
 * 画像の縦横比を変えずに指定サイズに縮小して収めます。切り抜かれません。（元サイズより大きいサイズを指定すると荒れます）
 * w,hどちらか片方を指定した場合は元の画像の縮尺になります。
 * w,hどちらも指定した場合は画像をそのサイズに収めたうえで指定したサイズの画像が生成されます。
 * 例）200×100の画像をw=100&h=100にした場合、画像サイズは100×100のようになり、上下50pxは画像の背景色で塗りつぶされます。（透過画像の場合は透過されます。）
 * ?fit=clamp&w=200 or ?fit=clamp&h=200 or ?fit=clamp&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#clamp
 */
type ImgixParamClamp = {
	fit: 'clamp'
	arrowLow: boolean
	w?: number
	h?: number
}

/**
 * 【Crop】
 * 画像の縦横比を変えずに指定サイズに拡大・縮小後、はみ出た部分をカットします。（元サイズより大きいサイズを指定すると荒れます）
 * ?fit=crop&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#crop
 * https://docs.imgix.com/apis/rendering/size/crop
 */
type Crop = `${Position},${Position}`
type ImgixParamCrop = {
	fit: 'crop'
	crop?: Crop
	arrowLow: boolean
	w: number
	h: number
}
/**
 * 【Fill】
 * 指定したサイズに画像が収まるように配置します。（元サイズより大きいサイズを指定すると荒れます）
 * 縦横どちらかにfill-colorで指定したカラーの余白が発生します。
 * w,hどちらか片方を指定した場合は元の画像の縮尺になります。
 * ?fit=fill&fill-color=333&w=200 or ?fit=fill&fill-color=333&h=200 or ?fit=fill&fill-color=333&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#fill
 */
type ImgixParamFill = {
	fit: 'fill'
	fillColor: string
	fill?: 'solid' | 'blur'
	arrowLow: boolean
	w?: number
	h?: number
}
/**
 * 【Fillmax】
 * 指定したサイズに画像が収まるように配置します。
 * （元サイズより大きいサイズを指定するとFillと違ってこちらの場合は元画像のサイズ以上には拡大されず、荒れません）
 * 縦横どちらかにfill-colorで指定したカラーの余白が発生します。
 * w,hどちらか片方を指定した場合は元の画像の縮尺になります。
 * ?fit=fillmax&fill-color=333&w=200 or ?fit=fillmax&fill-color=333&h=200 or ?fit=fillmax&fill-color=333&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#fill
 */
type ImgixParamFillMax = {
	fit: 'fillmax'
	fillColor: string
	fill?: 'solid' | 'blur'
	arrowLow: boolean
	w?: number
	h?: number
}
/**
 * 【Max】
 * 指定したサイズに収まるように縮尺を保って画像を配置します。
 * 元画像のサイズより大きいサイズを指定した場合は元画像のサイズまでの大きさへ縮小されます。
 * fit=clipの場合は荒れますが、こちらは荒れません。
 * ?fit=max&w=200 or ?fit=max&h=200 or ?fit=max&w=200&h=200
 * https://docs.imgix.com/apis/rendering/size/fit#max
 */
type ImgixParamMax = {
	fit: 'max'
	w?: number
	h?: number
}

export type ImgixParam = {
	imgixParam?:
		| ImgixParamClip
		| ImgixParamClamp
		| ImgixParamCrop
		| ImgixParamFill
		| ImgixParamFillMax
		| ImgixParamMax
}
export type GetImgixImageUrlParamProps = {
	adjustedWidth: number
	adjustedHeight: number
} & ImgixParam & { browser_size: number }

type AdjustedSizeProps = {
	width: number
	height: number
} & ImgixParam
export type GetAdjustedSize = ({
	width,
	height,
	imgixParam,
}: AdjustedSizeProps) => [number, number]

export type GenerateSrcsetByExtensionsProps = {
	src: string
	adjustedWidth: number
	adjustedHeight: number
} & ImgixParam
