import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = join(__dirname, '../src/data/products.ts');

/**
 * Normalize a single image path
 */
function normalizePath(path) {
  return path
    // Remove trailing space from "Gloves /" directory
    .replace(/\/Gloves \//, '/Gloves/')
    // Convert all image extensions to .webp
    .replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, '.webp');
}

/**
 * Main function to update products.ts
 */
function updateProductsPaths() {
  console.log('Starting path normalization...\n');
  console.log(`Reading: ${PRODUCTS_FILE}\n`);

  // Read the file
  const content = readFileSync(PRODUCTS_FILE, 'utf-8');

  // Track changes
  let changeCount = 0;
  const changes = [];

  // Replace all image paths
  const updated = content.replace(
    /image:\s*['"]([^'"]+)['"]/g,
    (match, path) => {
      const normalized = normalizePath(path);

      if (path !== normalized) {
        changeCount++;
        changes.push({
          from: path,
          to: normalized,
        });
      }

      return `image: '${normalized}'`;
    }
  );

  // Also handle images array (if any products have multiple images)
  const finalUpdated = updated.replace(
    /images:\s*\[([^\]]+)\]/g,
    (match, imagesList) => {
      const updatedImages = imagesList.replace(
        /['"]([^'"]+)['"]/g,
        (imgMatch, path) => {
          const normalized = normalizePath(path);

          if (path !== normalized) {
            changeCount++;
            changes.push({
              from: path,
              to: normalized,
            });
          }

          return `'${normalized}'`;
        }
      );
      return `images: [${updatedImages}]`;
    }
  );

  // Write the updated content
  writeFileSync(PRODUCTS_FILE, finalUpdated, 'utf-8');

  console.log('========================================');
  console.log('PATH NORMALIZATION COMPLETE');
  console.log('========================================');
  console.log(`Total changes: ${changeCount}`);
  console.log('========================================\n');

  if (changes.length > 0) {
    console.log('Sample changes (first 10):');
    changes.slice(0, 10).forEach(({ from, to }, index) => {
      console.log(`${index + 1}. ${from}`);
      console.log(`   → ${to}\n`);
    });
  }

  console.log('\nNext steps:');
  console.log('1. Verify products.ts changes with: git diff src/data/products.ts');
  console.log('2. Swap optimized images: mv public/products public/products-original-backup && mv public/products-optimized public/products');
  console.log('3. Test the site: npm run dev');
  console.log('4. Generate blur placeholders: npm run generate:blur-placeholders');
}

try {
  updateProductsPaths();
} catch (error) {
  console.error('Error updating paths:', error.message);
  process.exit(1);
}
