import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  // Images that should NOT be compressed (already optimized)
  skipFiles: [
    "alamerMallLogo.png",
    "bukhamseen_logo.jpg",
    "DIMI_Logo.jpg",
    "TARAF_Logo.jpg",
    "SaffronThreads_Logo.jpg",
    "Hypermarket_Logo.png",
    "lacasapasta_Logo.svg",
    "Shaiji_Logo.jpg",
  ],

  // Compression settings by file size
  compressionRules: {
    logo: {
      // Files over 500KB that are logos
      maxWidth: 800,
      quality: 85,
      webpQuality: 85,
    },
    gallery: {
      // Gallery and large photos
      maxWidth: 1920,
      quality: 80,
      webpQuality: 80,
    },
    thumbnail: {
      // Medium sized images
      maxWidth: 1200,
      quality: 82,
      webpQuality: 82,
    },
  },

  // Minimum size to compress (in KB)
  minSizeKB: 500,
};

// Stats tracking
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  compressedSize: 0,
};

/**
 * Get compression settings based on file characteristics
 */
function getCompressionSettings(filePath, sizeKB) {
  const fileName = path.basename(filePath);

  // Logo files
  if (fileName.toLowerCase().includes("logo")) {
    return config.compressionRules.logo;
  }

  // Very large files (gallery images)
  if (sizeKB > 3000) {
    return config.compressionRules.gallery;
  }

  // Medium files
  return config.compressionRules.thumbnail;
}

/**
 * Sleep function for retry delays
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Compress a single image
 */
async function compressImage(filePath, retryCount = 0) {
  const MAX_RETRIES = 2;

  try {
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);

    // Skip if in skip list
    if (config.skipFiles.includes(fileName)) {
      console.log(`⏭️  Skipping ${fileName} (already optimized)`);
      return { skipped: true, originalSize: sizeKB };
    }

    // Skip if too small
    if (sizeKB < config.minSizeKB) {
      console.log(`⏭️  Skipping ${fileName} (${sizeKB}KB - below threshold)`);
      return { skipped: true, originalSize: sizeKB };
    }

    // Skip SVG files
    if (ext === ".svg") {
      console.log(`⏭️  Skipping ${fileName} (SVG - already optimized)`);
      return { skipped: true, originalSize: sizeKB };
    }

    const settings = getCompressionSettings(filePath, sizeKB);
    console.log(`🔄 Compressing ${fileName} (${sizeKB}KB)...`);

    // Create backup directory
    const backupPath = filePath
      .replace("\\images\\", "\\images-original\\")
      .replace("/images/", "/images-original/");
    const backupDir = path.dirname(backupPath);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Backup original if not already backed up
    if (!fs.existsSync(backupPath)) {
      const fileBuffer = fs.readFileSync(filePath);
      fs.writeFileSync(backupPath, fileBuffer);
    }

    // Read original image into buffer first (avoids file locking)
    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    // Determine output format and settings
    let compressedBuffer;
    let webpBuffer;

    if (ext === ".png") {
      // For PNG, optimize and also create WebP version
      compressedBuffer = await sharp(inputBuffer)
        .resize(settings.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .png({
          quality: settings.quality,
          compressionLevel: 9,
        })
        .toBuffer();

      // Create WebP version
      webpBuffer = await sharp(inputBuffer)
        .resize(settings.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: settings.webpQuality })
        .toBuffer();
    } else if (ext === ".jpg" || ext === ".jpeg") {
      // For JPEG, optimize and create WebP version
      compressedBuffer = await sharp(inputBuffer)
        .resize(settings.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .jpeg({
          quality: settings.quality,
          mozjpeg: true,
        })
        .toBuffer();

      // Create WebP version
      webpBuffer = await sharp(inputBuffer)
        .resize(settings.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: settings.webpQuality })
        .toBuffer();
    }

    // Write compressed version
    if (compressedBuffer) {
      fs.writeFileSync(filePath, compressedBuffer);
    }

    // Write WebP version
    if (webpBuffer) {
      const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      fs.writeFileSync(webpPath, webpBuffer);
    }

    const newStats = fs.statSync(filePath);
    const newSizeKB = Math.round(newStats.size / 1024);
    const savings = (((sizeKB - newSizeKB) / sizeKB) * 100).toFixed(1);

    console.log(`✅ ${fileName}: ${sizeKB}KB → ${newSizeKB}KB (${savings}% smaller)`);

    return {
      processed: true,
      originalSize: sizeKB,
      compressedSize: newSizeKB,
      savings: parseFloat(savings),
    };
  } catch (error) {
    // Retry on file access errors
    if (
      (error.message.includes("UNKNOWN") || error.message.includes("EBUSY")) &&
      retryCount < MAX_RETRIES
    ) {
      console.log(
        `⏸️  Retrying ${path.basename(filePath)} (attempt ${retryCount + 1}/${MAX_RETRIES})...`
      );
      await sleep(1000);
      return compressImage(filePath, retryCount + 1);
    }

    console.error(`❌ Error processing ${path.basename(filePath)}: ${error.message}`);
    return { error: true };
  }
}

/**
 * Recursively find all image files
 */
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip backup directory
      if (!filePath.includes("images-original")) {
        findImages(filePath, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Main execution
 */
async function main() {
  console.log("🚀 Starting image compression...\n");

  const imagesDir = path.join(__dirname, "..", "public", "images");

  if (!fs.existsSync(imagesDir)) {
    console.error("❌ Images directory not found:", imagesDir);
    process.exit(1);
  }

  // Find all images
  const imageFiles = findImages(imagesDir);
  console.log(`📁 Found ${imageFiles.length} images\n`);

  // Process each image
  for (const filePath of imageFiles) {
    const result = await compressImage(filePath);

    if (result.skipped) {
      stats.skipped++;
      stats.originalSize += result.originalSize;
      stats.compressedSize += result.originalSize;
    } else if (result.error) {
      stats.errors++;
    } else if (result.processed) {
      stats.processed++;
      stats.originalSize += result.originalSize;
      stats.compressedSize += result.compressedSize;
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 COMPRESSION SUMMARY");
  console.log("=".repeat(60));
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images (already optimized)`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log(`📦 Original size: ${(stats.originalSize / 1024).toFixed(2)} MB`);
  console.log(`📦 Compressed size: ${(stats.compressedSize / 1024).toFixed(2)} MB`);

  const totalSavings = stats.originalSize - stats.compressedSize;
  const savingsPercent = ((totalSavings / stats.originalSize) * 100).toFixed(1);

  console.log(`💾 Space saved: ${(totalSavings / 1024).toFixed(2)} MB (${savingsPercent}%)`);
  console.log("=".repeat(60));
  console.log("\n✨ Originals backed up to: public/images-original/");
  console.log("✨ WebP versions created for modern browsers");
  console.log("\n⚠️  Next step: Update components to use OptimizedImage component");
}

// Run the script
main().catch(console.error);
