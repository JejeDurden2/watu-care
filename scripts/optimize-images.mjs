import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, relative, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '../public/products');
const OUTPUT_DIR = join(__dirname, '../public/products-optimized');

// Configuration by size category
const PRESETS = {
  large: { width: 1400, quality: 85 }, // Category headers
  medium: { width: 1200, quality: 82 }, // Family photos (全家福)
  standard: { width: 800, quality: 80 }, // Most product photos
  small: { width: null, quality: 80 }, // Already small images
};

/**
 * Determine preset based on filename and file size
 */
async function getPreset(filePath, fileSize) {
  const fileName = basename(filePath);

  // Category images (大图, Categorie, Image)
  if (fileName.includes('Categorie') || fileName.includes('Image categorie')) {
    return PRESETS.large;
  }

  // Family photos (全家福 = "family portrait")
  if (fileName.includes('全家福') || fileSize > 3 * 1024 * 1024) {
    return PRESETS.medium;
  }

  // Skip tiny images
  if (fileSize < 50 * 1024) {
    return PRESETS.small;
  }

  return PRESETS.standard;
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputPath, preset) {
  const img = sharp(inputPath);
  const metadata = await img.metadata();

  let pipeline = img;

  // Resize if needed and preset specifies width
  if (preset.width && metadata.width > preset.width) {
    pipeline = pipeline.resize(preset.width, null, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert to WebP
  pipeline = pipeline.webp({ quality: preset.quality });

  // Ensure output directory exists
  await mkdir(dirname(outputPath), { recursive: true });

  await pipeline.toFile(outputPath);
}

/**
 * Recursively walk directory
 */
async function* walkDir(dir) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const path = join(dir, file.name);
      if (file.isDirectory()) {
        yield* walkDir(path);
      } else {
        yield path;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
}

/**
 * Process all images
 */
async function processImages() {
  console.log('Starting image optimization...\n');
  console.log(`Source: ${PUBLIC_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  let processed = 0;
  let skipped = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let errors = [];

  for await (const filePath of walkDir(PUBLIC_DIR)) {
    const ext = extname(filePath).toLowerCase();

    // Only process image files, skip already-optimized WebP
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    const relativePath = relative(PUBLIC_DIR, filePath);
    const outputPath = join(OUTPUT_DIR, relativePath.replace(ext, '.webp'));

    const stats = await stat(filePath);
    const preset = await getPreset(filePath, stats.size);

    totalOriginalSize += stats.size;

    try {
      await optimizeImage(filePath, outputPath, preset);
      const newStats = await stat(outputPath);
      totalOptimizedSize += newStats.size;
      const saved = stats.size - newStats.size;

      const savedPercent = ((saved / stats.size) * 100).toFixed(1);
      console.log(`✓ ${relativePath}`);
      console.log(`  ${(stats.size / 1024 / 1024).toFixed(2)}MB → ${(newStats.size / 1024 / 1024).toFixed(2)}MB (${savedPercent}% saved)`);
      console.log(`  Preset: ${preset === PRESETS.large ? 'large' : preset === PRESETS.medium ? 'medium' : preset === PRESETS.small ? 'small' : 'standard'}\n`);

      processed++;
    } catch (error) {
      console.error(`✗ Failed: ${relativePath}`, error.message);
      errors.push({ file: relativePath, error: error.message });
      skipped++;
    }
  }

  const totalSaved = totalOriginalSize - totalOptimizedSize;
  const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);

  console.log('\n========================================');
  console.log('OPTIMIZATION COMPLETE');
  console.log('========================================');
  console.log(`Processed: ${processed} images`);
  console.log(`Skipped/Failed: ${skipped} images`);
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`);
  console.log('========================================\n');

  if (errors.length > 0) {
    console.log('Errors encountered:');
    errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  console.log('\nNext steps:');
  console.log('1. Review optimized images in: public/products-optimized/');
  console.log('2. Sample 20 images to verify quality');
  console.log('3. Run: npm run normalize:paths');
  console.log('4. Swap directories when ready');
}

processImages().catch(console.error);
