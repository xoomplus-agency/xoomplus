import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import os from 'os';

const videos = 'public/videos';
const images = 'public/images';

/** Prefer a fresh video frame when ffmpeg is available; else existing poster. */
function loadPosterSource() {
	const framePath = path.join(os.tmpdir(), 'xoomplus-hero-frame.png');
	const video = path.join(videos, 'bg-hero-desktop.webm');
	try {
		execFileSync(
			'ffmpeg',
			['-y', '-ss', '0.5', '-i', video, '-frames:v', '1', '-update', '1', framePath],
			{ stdio: 'ignore' },
		);
		if (fs.existsSync(framePath)) return fs.readFileSync(framePath);
	} catch {
		/* fall through */
	}
	return fs.readFileSync(path.join(videos, 'bg-hero-poster.webp'));
}

const srcBuf = loadPosterSource();
const meta = await sharp(srcBuf).metadata();
console.log('poster meta', meta.width, meta.height, meta.format);

/** [width, avifQuality, webpQuality] — mobile 640w target ≤25KB */
const presets = [
	[640, 42, 60],
	[960, 40, 58],
	[1280, 42, 60],
	[1920, 42, 60],
];
for (const [w, aq, wq] of presets) {
	const base = sharp(srcBuf).resize({ width: w, withoutEnlargement: true });
	const avifOut = path.join(videos, `bg-hero-poster-${w}.avif`);
	const webpOut = path.join(videos, `bg-hero-poster-${w}.webp`);
	await base.clone().avif({ quality: aq, effort: 7 }).toFile(avifOut);
	await base.clone().webp({ quality: wq, effort: 6 }).toFile(webpOut);
	console.log(w, 'avif', fs.statSync(avifOut).size, 'webp', fs.statSync(webpOut).size);
}

fs.copyFileSync(
	path.join(videos, 'bg-hero-poster-1280.avif'),
	path.join(videos, 'bg-hero-poster.avif'),
);
fs.copyFileSync(
	path.join(videos, 'bg-hero-poster-1280.webp'),
	path.join(videos, 'bg-hero-poster.webp'),
);

const brands = [
	'brand-concisemedico',
	'brand-sterling-cooper',
	'brand-bodykite',
	'brand-gopsych',
];
for (const b of brands) {
	const hi = path.join(images, `${b}-2x.webp`);
	const src = fs.existsSync(hi) ? hi : path.join(images, `${b}.webp`);
	const buf = fs.readFileSync(src);
	const out150 = path.join(images, `${b}-150.webp`);
	const out300 = path.join(images, `${b}.webp`);
	const out450 = path.join(images, `${b}-2x.webp`);
	await sharp(buf)
		.resize({ width: 150, withoutEnlargement: true })
		.webp({ quality: 70, effort: 6 })
		.toFile(out150);
	await sharp(buf)
		.resize({ width: 300, withoutEnlargement: true })
		.webp({ quality: 70, effort: 6 })
		.toFile(out300);
	await sharp(buf)
		.resize({ width: 450, withoutEnlargement: true })
		.webp({ quality: 70, effort: 6 })
		.toFile(out450);
	console.log(
		b,
		fs.statSync(out150).size,
		fs.statSync(out300).size,
		fs.statSync(out450).size,
	);
}
