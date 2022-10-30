import type { BreadcrumbItemProps } from '@/components/ui/breadcrumb/BreadcrumbItem/type'
type PageData = {
	title: string
	slug: string
}
type PageDataWithParent = PageData & { parent: PageDataWithParent | null }
export const generateBreadcrumbObjectArray = (pageData: PageDataWithParent) => {
	const pageObjectsParentToChild: PageData[] = []
	/**
	 * ページデータのオブジェクトを親から子に向けて再帰的にタイトルとスラッグを取得して配列を作成します。
	*/
	const getParentData = (data: PageDataWithParent) => {
		if (data.parent) {
			pageObjectsParentToChild.push({ title: data.title, slug: data.slug })
			getParentData(data.parent)
		} else {
			pageObjectsParentToChild.push({ title: data.title, slug: data.slug })
		}
	}
	getParentData(pageData)
	/**
	 * @return [
	 * 	{
	 * 		title: "GrandChild",
	 * 		slug: "grandChild",
	 * 	},
	 * 	{
	 * 		title: "Child",
	 * 		slug: "child",
	 * 	},
	 * 	{
	 * 		title: "Parent",
	 * 		slug: "parent",
	 * 	}
	 * ]
	 */
	const pageObjectsChildToParent = [...pageObjectsParentToChild].reverse()
	const pageObjects: BreadcrumbItemProps[] = []
	pageObjectsChildToParent.forEach((page, index) => {
		const childPage = pageObjects[index - 1]
		pageObjects[index] = childPage
		? {
				title: page.title,
				path: `${childPage.path}/${page.slug}`,
			}
		: {
				title: page.title,
				path: page.slug,
			}
	})
	return { pageObjects }
}
