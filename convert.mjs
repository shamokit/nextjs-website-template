/**
 * jpg pngをwebpに変換してsrc/imagesに保存します。
 * windows環境でavifへの変換がエラーになるため、未完成です。
 * avif画像は別の手段で生成してsrc/imagesディレクトリに入れてください。
 */
import { ImagePool } from "@squoosh/lib";
import { cpus } from "os";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import glob from "glob";

const IMAGE_SRC_DIR = "./src/images";

// 圧縮オプション
const webpEncodeOptions = {
	webp: {
		lossless: 1,
	},
};
// windows環境でエラーになるため対応していません。
const avifEncodeOptions = {
	avif: {
		cqLevel: 0,
	},
};

// 画像フォルダ内のJPGとPNGを抽出
const convertImageFiles = glob.sync(`${IMAGE_SRC_DIR}/**/*.+(jpg|png)`);

// 抽出したファイルの情報をconvertImagePoolListにセット
const convertImagePool = new ImagePool(cpus().length);
const convertImagePoolList = await Promise.all(convertImageFiles.map(async (file) => {
	const imageFile = await readFile(file);
	const { dir, name } = path.parse(file)
	const image = convertImagePool.ingestImage(imageFile);
	await image.decoded;
	return { dir, name, image };
}));

// 圧縮
await Promise.all(
	convertImagePoolList.map(async (item) => {
		const { image } = item;
		await image.encode(webpEncodeOptions)
	})
);

// 画像をwebpに変換して出力
await Promise.all(
	convertImagePoolList.map(async (item) => {
		const {
			name,
			dir,
			image: { encodedWith },
		} = item;

		// 圧縮したデータを格納
		let data;
		if (encodedWith.webp) {
			data = await encodedWith.webp;
		}

		// 書き込み
		if (data) {
			await writeFile(`${dir}/${name}.webp`, data.binary);
		}
	})
)

await convertImagePool.close();
