# Next.js Website Template

microCMSを使用し、Cloudflare PagesでWebサイトをデプロイするテンプレートです。

## 注意

現在ベータ版です。ディレクトリ構成やファイル構成は変わることがあります。

## npm scripts

| コマンド | 内容 |
| --- | --- |
| npm run wrangler-dev | Cloudflare PagesのFunctionsをローカルで確認します。<br>プレビューの確認に使用します。 |
| npm run dev | 開発サーバーを立ち上げます。 |
| npm run lint-fix | ESLintとStyleLintのリントチェックとfixを行います。 |
| lint-fix:markup | マークアップのチェックを行います。 |
| img-convert | publicフォルダ内の画像について、webp画像を生成します。 |
| img-resize | publicフォルダ内の画像について、pictureタグで使用する各サイズの画像を生成します。 |

## 環境

| 項目 | 内容 |
| --- | --- |
| node | 16.17.0 |

## 最初にやること

不要なファイルを削除していきます。  
src/apiやsrc/schemasにデフォルトでよく使いそうな型を定義してあります。  
不要であれば最初に削除ください。

## meta

- src/utils/meta.tsを編集します。
- next-seo.config.jsを編集します。
- next-sitemap.config.jsを編集します。
- _app.tsx、_document.tsxの構造化マークアップを編集します。不要であれば削除してください。

## CSS

基本的にTailwindCSSのユーティリティクラスを使用しますが、ソースコードの可読性が著しく落ちる場合は例外的にCSSModulesを使用します。

### 初期設定

[_font.css](./src/styles/vars/_font.css)

fontSizeをCSS変数で管理します。  
デザイントークンがあることが前提になっています。

```--step--xx```の倍率でフォントサイズをベースサイズから算出していますが、デザイントークンがない場合も多いと思うので使わないなら使わないでもかまいません。

スマホで11pxを使ったらタブレットでは12px、ラップトップでは14pxなど決まったフォントサイズを使用するルールがあることが前提でCSS変数を使用しているので、不要な場合はTailwindCSSで各自調整してください。

同様に色や余白も同じディレクトリ内のcssファイルで定義してtailwind.config.jsで使用しています。

## ブレイクポイント、画像の生成サイズ

以下2ファイルは数値をそろえてください。
- [tailwind.config.js](./tailwind.config.js)
- [_breakpoint.css](./src/styles/vars_sass/_breakpoint.css)

### 画像サイズ系

以下2ファイルは数値をそろえてください。
- [resize.mjs](./resize.mjs)
- [const.ts](./src/components/ui/image/const.ts)

ここで設定しています。

## 環境変数

.envに
```
CMS_API_URL=https://xxx.microcms.io/api/v1/
CMS_PREVIEW_API_KEY=xxxxxxxxxxxxxxxxxxxxxx
CMS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

wrangler.tomlに
```
[vars]
CMS_API_URL = "https://xxx.microcms.io/api/v1/"
CMS_PREVIEW_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxx"
CMS_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxx"
SECRET = "xxxx"
```

を記載してください。  
これらの環境変数は、Cloudflare Pagesの環境変数に登録する必要があります。

SECRETについては下書き記事取得のAPIを叩くときにURLパラメータと一致するかどうかをチェックします。  
なんでもいいですがAPIキーよりも長い文字列をおすすめします。

## API

### schemas

以下を見てください。

[README.md](./src/schemas/README.md)

### aspida

aspidaを使用してエンドポイントのタイポを防ぎます。  
このディレクトリのファイルを変更したら

``` npm run api:build ``` コマンドで$api.tsファイルを再生成してください。

### Functions

Cloudflare PagesのFunctionsを使用します。./functionsにAPIを作成します。  
``` npm run wrangler-dev ``` を使用すればFunctionsを確認できます。

[http://127.0.0.1:8788/](http://127.0.0.1:8788/) で開発サーバーが立ち上がります。

### プレビュー

以下のURLでプレビューページがCSRされます。  
ローカル環境では{domain}部分が`http://127.0.0.1:8788`、本番環境では本番ドメインでプレビュー画面を閲覧できます。

| CMS | URL |
| - | - |
| microCMS | {domain}/preview?endpoint=xxx&contentId=xxx&draftKey=xxxxxxxxx&secret=xxxxxxxxxxxx |

envやwrangler.tomlに登録したSECRETとsecretパラメータが同じならプレビューAPIをたたくことができます。

## リント

以下を見てください。

- [.eslintrc.js](./.eslintrc.js)
- [.stylelintrc.json](./.stylelintrc.json)

カスタムコンポーネントについては[.markuplintrc](./.markuplintrc)でも一部設定しています。

## フォーマット

以下を見てください。

- [.editorconfig](./.editorconfig)
- [.prettierrc.json](./.prettierrc.json)

## エイリアス

以下を見てください。

- [.tsconfig.json](./.tsconfig.json)

| alias | path |
| --- | --- |
| @/public | public |
| @/api | src/api |
| @/components | src/components |
| @/libs | src/libs |
| @/pages | src/pages |
| @/styles | src/styles |
| @/utils | src/utils |

## 画像

基本的にCMSに登録してください。  
public以下のファイルとCMSから取得する画像についてはimgixのパラメータを使って最適化しています。

| コマンド | 内容 |
| --- | --- |
| img-convert | publicフォルダ内の画像について、webp画像を生成します。 |
| img-resize | publicフォルダ内の画像について、pictureタグで使用する各サイズの画像を生成します。 |

この2コマンドを使用して、最適化後のファイルを生成します。  
監視などはしていませんが、そもそもリポジトリ内に画像はほぼ含めない想定です。

imgixパラメータが使用できるCMSを使用している場合はsrc/components/ui/image/Imgixのコンポーネントを使用すると便利です。  
imgixのパラメータを使って最適なサイズの画像を読み込みます。

縦横比を保ったり元サイズより大きく表示させない（荒れさせない）ようにする設定があったり、デバイスごとでの画像の出し分けにも対応しています。

## SVG

単色で使用するようなアイコンは[const.ts](./src/components/ui/svg/const.ts)で管理します。

ロゴなど複数の色を含むSVGに関しては別でコンポーネント化してください。

## アコーディオン

特別な事情がないのであれば[Accordionコンポーネント](./src/components/ui/accordion/Accordion)を使用してください。  
detailsタグで実装しているので、ctrl+Fでの検索で自動で開閉します。

## タブ切り替え

特別な事情がないのであれば[TablistとTab](./src/components/ui/tab/)を使用してください。  
こちらもdetailsタグで実装しているので、ctrl+Fでの検索で自動で開閉します。

### 注意！

role="tablist"での実装ではないので、読み上げブラウザでの読み上げが通常と異なると思います。まだ確認できていません。

## 構造化マークアップ

[schema-dts.ts](./src/libs/schema-dts.ts)

こちらでimportしているいくつかの構造化マークアップを行っています。

[meta.ts](./src/libs/meta.ts)

ここで定義している変数をいくつか使っています。
