/**
 * 文字列の一文字目を大文字、その他を小文字にして返します。
 * @param {string} str
 */
export const capitalize = (str: string) => {
	if (typeof str !== 'string' || !str) return str
	return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
}
