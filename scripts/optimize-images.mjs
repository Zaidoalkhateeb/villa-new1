import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");

const targets = [
  // Gallery images (currently huge PNG photos)
  ...Array.from({ length: 16 }, (_, i) => String(i + 1).padStart(2, "0") + ".png"),
  // Hero poster
  "hero-bg.png",
  // Other large-ish images
  "villa-1.png",
  "villa-2.png",
];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function shouldRegenerate(srcPath, outPath) {
  if (!(await fileExists(outPath))) return true;
  const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
  return srcStat.mtimeMs > outStat.mtimeMs;
}

async function optimizeOne(fileName) {
  const srcPath = path.join(publicDir, fileName);
  const outPath = srcPath.replace(/\.png$/i, ".webp");

  if (!(await fileExists(srcPath))) {
    console.warn(`skip (missing): ${path.relative(projectRoot, srcPath)}`);
    return;
  }

  if (!(await shouldRegenerate(srcPath, outPath))) {
    console.log(`up-to-date: ${path.relative(projectRoot, outPath)}`);
    return;
  }

  await sharp(srcPath, { failOn: "none" })
    .rotate()
    .webp({ quality: 78, effort: 6 })
    .toFile(outPath);

  const [srcStat, outStat] = await Promise.all([fs.stat(srcPath), fs.stat(outPath)]);
  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2) + "MB";
  console.log(
    `wrote: ${path.relative(projectRoot, outPath)} (${mb(srcStat.size)} → ${mb(outStat.size)})`
  );
}

await fs.mkdir(path.join(projectRoot, "scripts"), { recursive: true });

for (const fileName of targets) {
  if (!/\.png$/i.test(fileName)) continue;
  // Run sequentially to avoid OOM on small machines
  // eslint-disable-next-line no-await-in-loop
  await optimizeOne(fileName);
}
