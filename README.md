# Next.js Website Template

microCMSもしくはNewtを使用し、Cloudflare PagesでWebサイトをデプロイするテンプレートです。

## 注意

現在ベータ版です。ディレクトリ構成やファイル構成は変わることがあります。

## Todo

- microCMS周りの調整
- データの取得周りの整理
- プレビュー用のAPIの整理

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
CMS_API_URL=https://xxx.api.newt.so/v1 or https://xxx.microcms.io/api/v1/
CMS_CDN_API_KEY=xxxxxxxxxxxxxxxxxxxxxx
CMS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```
* CMS_CDN_API_KEYはNewtのみで使用

wrangler.tomlに
```
[vars]
CMS_API_URL = "https://xxx.api.newt.so/v1"
CMS_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxx"
SECRET = "xxxx"
```
* CMS_CDN_API_KEYはNewtのみで使用

を記載してください。  
これらの環境変数は、Cloudflare Pagesの環境変数に登録する必要があります。

## API

### schemas

以下を見てください。

[README.md](./src/schemas/README.md)

### aspida

aspidaを使用してエンドポイントのタイポを防ぎます。

microCMSとNewtどちらを使用するか決めたら、```src/api```ディレクトリの使わないほうのCMS名のディレクトリを削除し、```./aspida.config.ts```のパスを使うほうのCMSのディレクトリに向けてください。

- microCMSの場合: ```input: "src/api/microcms"```
- Newtの場合: ```input: "src/api/newt"```

その後、
``` npm run api:build ``` コマンドで$api.tsファイルを生成してください。

### Functions

Cloudflare PagesのFunctionsを使用します。./functionsにAPIを作成します。  
``` npm run wrangler-dev ``` を使用すればFunctionsを確認できます。

[http://127.0.0.1:8788/](http://127.0.0.1:8788/) で開発サーバーが立ち上がります。

Newtの場合はhttp://127.0.0.1:8788/preview?appUID=xxx&modelUID=xxx&contentId=xxxxxxxxx&secret=test のようなURLを管理画面で設定してください。

secretパラメータに関しては十分に長い文字列を生成しておいてください。  
推測されにくければなんでもいいです。

先ほど作成したenvやwrangler.tomlに登録したSECRETとこの値が同じならプレビューを取得することができます。

### プレビュー

[preview.ts](./functions/api/preview.ts)で、変数cmsNameにnewtもしくはmicroCMSを入力してください。

ドメイン/preview?appUID=xxx&modelUID=xxx&contentId=xxxxxxxxx&secret=test
でプレビューページがCSRされます。  
APIキーは公開されません。

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
