/**
 * jpg png webp avifを圧縮、リサイズしてpublic/imagesに保存します。
 * このコマンドを実行する前にnode convert.mjsを実行してsrc/imagesディレクトリに
 * ・元の拡張子の画像
 * ・webp拡張子の画像
 * を生成してください。
 * ！convert.mjsに関してはavif画像の生成ができません。
 */
import { ImagePool } from "@squoosh/lib";
import { cpus } from "os";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import glob from "glob";
import sizeOf from "image-size";

// https://gs.statcounter.com/screen-resolution-stats#monthly-202108-202208-bar
// 指定のサイズ分の画像を生成します。
const BROWSER_SIZES = [
	640, 750, 828, 1080, 1170, 1280, 1366, 1440, 1536, 1920, 2560,
]
const IMAGE_DIR = {
	"SRC": "./src/images",
	"DIST": "./public/images"
}

// 圧縮オプション
// https://github.com/GoogleChromeLabs/squoosh/blob/dev/libsquoosh/src/codecs.ts#L284
const encodeOptions = {
	"jpg": { mozjpeg: { quality: 80 } },
	"png": {
		oxipng: {
			effort: 2,
		},
	},
	"webp": {
		webp: {
			lossless: 1,
		},
	},
	"avif": {
		avif: {
			cqLevel: 0,
		},
	}
}

// resizeの設定
const preprocessOptions = BROWSER_SIZES.map((browserSize) => {
	return {
		resize: {
			enabled: true,
			width: browserSize,
		}
	}
});

// 画像フォルダ内のJPGとPNGとWEBPとAVIFを抽出
const convertImageFiles = glob.sync(`${IMAGE_DIR.SRC}/**/*.+(jpg|png|webp|avif)`);

// 抽出したファイルの情報をconvertImagesにセット
const convertImagePool = new ImagePool(cpus().length);
const convertImages = await Promise.all(preprocessOptions.map(async (preprocessOption) => {
	return await Promise.all(convertImageFiles.map(async (file) => {
		const imageFile = await readFile(file);
		const { dir, name, ext } = path.parse(file)
		const image = convertImagePool.ingestImage(imageFile);
		await image.decoded;

		// リサイズ後のファイルの名前を変更
		// img-name.webp → img-name@w640.webp
		const imageWidth = sizeOf(file)
		if(!imageWidth.width) return
		if (imageWidth.width > preprocessOption.resize.width) {
			await image.preprocess(preprocessOption);
			const nameWithSize = `${name}@w${preprocessOption.resize.width}`
			return { dir, name: nameWithSize, ext, image };
		} else {
			// 画像サイズがリサイズしたいサイズ以下の場合は元のサイズでコピー
			await image.preprocess({
				resize: {
					enabled: true,
					width: imageWidth.width,
				}
			});
			return { dir, name, ext, image };
		}
	}));
}))

// [[{}, {}],[{}, {}]]になっているので均す
const convertImagesToFlat = convertImages.flat(2)

await Promise.all(
	convertImagesToFlat.map(async (item) => {
		if (!item) return
		const {
			name,
			dir,
			ext,
			image,
			image: { encodedWith },
		} = item;
		await image.encode(encodeOptions[ext.replace('.', '')])

		// 圧縮したデータを格納
		let data;
		if (encodedWith.mozjpeg) {
			data = await encodedWith.mozjpeg;
		} else if (encodedWith.oxipng) {
			data = await encodedWith.oxipng;
		} else if (encodedWith.webp) {
			data = await encodedWith.webp;
		} else if (encodedWith.avif) {
			data = await encodedWith.avif;
		}

		// 書き込み
		if (data) {
			await writeFile(`${dir.replace(IMAGE_DIR.SRC, IMAGE_DIR.DIST)}/${name}${ext}`, data.binary);
		}
	})
)

await convertImagePool.close();
