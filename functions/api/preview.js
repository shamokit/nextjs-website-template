import { previewApiClient } from '@/lib/apiClient'
const fetchPreviewPage = async (pageSlug) => {
	const data = await previewApiClient.staticPage.pageData.$get({
		query: {
			limit: 1,
			slug: pageSlug,
			depth: 2,
		},
	})

	return { data }
}
export default async (req, res) => {
  // シークレットトークンと次のパラメーターを確認してください。
  // このシークレットトークンはAPIルートとCMSだけが知っている必要があります。
  if (req.query.secret !== process.env.PREVIEW_SECRET_KEY || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // 提供された `slug` が存在しているかどうか確認するため、ヘッドレスCMSをフェッチします。
  // getPostBySlugはヘッドレスCMSへの必要なフェッチロジックを実装します。
  const {data} = await fetchPreviewPage(req.query.slug[0])
	const pageData = data.items[0]

  // slugが存在しない場合、プレビューモードを有効にしないようにしましょう。
  if (!pageData) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Cookiesを設定し、プレビューモードを有効にします。
  res.setPreviewData({})

	const slugs = data.items.map((page) => page.slug)
	const reverseSlugs = [...slugs].reverse()

	const stringPaths = []
	reverseSlugs.forEach((path, index) => {
		const prev = stringPaths[index - 1]
		stringPaths[index] = prev ? `${stringPaths[index - 1]}/${path}` : path
	})

  // フェッチされた投稿にパスをリダイレクトします。
  // オープンリダイレクトの脆弱性につながる可能性があるため、req.query.slugにリダイレクトしません。
  res.redirect(stringPaths[-1])
}
