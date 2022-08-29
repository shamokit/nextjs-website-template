/**
 * 数字の配列を作成します。
 */
export function* generateIntegerArray(start: number, end: number) {
	for (let i = start; i <= end; i++) {
		yield i
	}
}
