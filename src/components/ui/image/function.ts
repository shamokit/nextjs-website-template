/**
 * ファイルのパスからファイル名と拡張子を取得し、オブジェクトで返します
 * @param fileNameStr - 拡張子を含むファイルパスを指定します
 */
export const getFileData = (fileNameStr: string) => {
	const fileName = fileNameStr
	if(typeof fileName !== "string") throw Error('Error. This is not an image.')

	const extensionIndex = fileName.lastIndexOf('.')
	const hasExtension = extensionIndex > 0 && extensionIndex < fileName.length - 1
	if(!hasExtension) throw Error('Error. This is not an image.')

	const fileNameToArrayAtDot = fileName.split('.')
	const extension = fileNameToArrayAtDot.pop()
	return {
		fileName: fileNameToArrayAtDot.join('.'),
		fileExtension: extension
	}
}
