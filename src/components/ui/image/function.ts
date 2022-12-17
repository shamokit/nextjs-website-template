import type { GenerateSrcsetByExtensionsProps } from './type'
import { BROWSER_SIZES } from './const'

// TODO:Optional Object Patternで書きなおす
/**
 * ファイルのパスからファイル名と拡張子を取得し、オブジェクトで返します
 * @param fileNameStr - 拡張子を含むファイルパスを指定します
 */
export const getFileData = (fileNameStr: string) => {
	const fileName = fileNameStr
	if (typeof fileName !== 'string') throw Error('Error. This is not an image.')

	const extensionIndex = fileName.lastIndexOf('.')
	const hasExtension = extensionIndex > 0 && extensionIndex < fileName.length - 1
	if (!hasExtension) throw Error('Error. This is not an image.')

	const fileNameToArrayAtDot = fileName.split('.')
	const extension = fileNameToArrayAtDot.pop()
	return {
		fileName: fileNameToArrayAtDot.join('.'),
		fileExtension: extension,
	}
}

/**
 * publicフォルダの画像について、各拡張子ごとのsrcsetの配列を作って返す
 * @returns url srcsetに指定するURL
 * @returns ext 画像の拡張子

 */
export const generateSrcsetByExtensions = ({
	src,
	width,
}: GenerateSrcsetByExtensionsProps) => {
	// 画像のinitialサイズを追加して大→小に並び替え
	const browser_sizes = [width, ...BROWSER_SIZES].sort((a, b) => b - a)
	const { fileName, fileExtension } = getFileData(src)
	const extensions = ['webp', 'default'] as const
	return extensions.map((ext) => {
		return {
			url: browser_sizes
				.filter((browser_size) => {
					return browser_size <= width ? true : false
				})
				.map((browser_size) => {
					return `${fileName}${width === browser_size ? '' : `@w${browser_size}`}.${
						ext === 'default' ? fileExtension : ext
					} ${browser_size}w`
				})
				.join(', '),
			ext,
		}
	})
}
