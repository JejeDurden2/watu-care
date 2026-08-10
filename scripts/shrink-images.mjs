/**
 * Shrink oversized product photos in place.
 *
 * The catalogue shipped 78 MB of source images, including single JPEGs over
 * 8 MB. next/image serves derivatives so visitors never downloaded those bytes,
 * but the repo, every deploy and every cold image transform paid for them.
 *
 * Re-encodes in place and keeps the original filename and extension, so no
 * reference in src/data/products.ts has to change.
 *
 * Usage: npm run shrink:images [-- --dry]
 */
import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TARGET_DIR = join(ROOT, 'public/products');

/** Anything under this is already small enough to leave alone. */
const SIZE_THRESHOLD = 250 * 1024;
/** Product shots are rendered at 800px at most; 1400 leaves room for zoom. */
const MAX_WIDTH = 1400;
const QUALITY = 80;

const DRY = process.argv.includes('--dry');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function encoder(ext) {
  if (ext === '.png') return (p) => p.png({ compressionLevel: 9, palette: true });
  if (ext === '.webp') return (p) => p.webp({ quality: QUALITY });
  return (p) => p.jpeg({ quality: QUALITY, mozjpeg: true });
}

let before = 0;
let after = 0;
let touched = 0;

for await (const file of walk(TARGET_DIR)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;

  const { size } = await stat(file);
  if (size < SIZE_THRESHOLD) continue;

  before += size;

  if (DRY) {
    after += size;
    console.log(`would shrink ${(size / 1024 / 1024).toFixed(1)} MB  ${file}`);
    continue;
  }

  // Write to a sibling first: sharp cannot read and write the same path.
  const tmp = `${file}.tmp`;
  await encoder(ext)(
    sharp(file).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true }),
  ).toFile(tmp);

  const { size: newSize } = await stat(tmp);
  if (newSize >= size) {
    await unlink(tmp);
    after += size;
    continue;
  }

  await rename(tmp, file);
  after += newSize;
  touched += 1;
  console.log(
    `${(size / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(0)} KB  ${file}`,
  );
}

console.log(
  `\n${touched} files rewritten: ${(before / 1024 / 1024).toFixed(1)} MB -> ${(after / 1024 / 1024).toFixed(1)} MB`,
);
