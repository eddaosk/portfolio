#!/usr/bin/env node
/**
 * Optimize all images in img/hobbies:
 * - Resize to max width 1200px (no upscaling)
 * - Compress JPEGs to target < 300KB (adaptive quality)
 * - Compress PNGs using palette + max compression, adapt width if needed
 * - Overwrite originals
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_INPUT_DIR = path.join(ROOT, "img", "hobbies");
const TARGET_MAX_BYTES_DEFAULT = 300 * 1024; // 300KB
const START_JPEG_QUALITY = 78; // good quality baseline

function isImage(file) {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png"].includes(ext);
}

async function optimizeOnePath(inputPath, opts = {}) {
    const ext = path.extname(inputPath).toLowerCase();
    const TARGET_MAX_BYTES = opts.targetMaxBytes || TARGET_MAX_BYTES_DEFAULT;

    // Read metadata for dimensions
    let meta;
    try {
        meta = await sharp(inputPath).metadata();
    } catch (e) {
        console.error(`Skipping ${file}: cannot read metadata (${e.message})`);
        return;
    }

    const maxWidth = opts.maxWidth || 1200;
    let width = Math.min(maxWidth, meta.width || maxWidth);
    let jpegQuality = START_JPEG_QUALITY;
    let pngCompression = 9;
    let usePalette = true;

    const attempts = 7; // adaptive passes
    let bestBuffer = null;

    for (let i = 0; i < attempts; i++) {
        const base = sharp(inputPath).resize({ width, withoutEnlargement: true, fit: "inside" });

        let pipeline;
        if (ext === ".jpg" || ext === ".jpeg") {
            pipeline = base.jpeg({ quality: jpegQuality, mozjpeg: true });
        } else if (ext === ".png") {
            pipeline = base.png({ compressionLevel: pngCompression, palette: usePalette });
        } else {
            console.warn(`Unsupported format for ${file}, skipping.`);
            return;
        }

        const buffer = await pipeline.toBuffer();
        bestBuffer = buffer; // keep last

        if (buffer.length <= TARGET_MAX_BYTES) {
            // Write and finish
            await sharp(buffer).toFile(inputPath);
            const fileName = path.basename(inputPath);
            console.log(`✔ ${fileName} → ${Math.round(buffer.length / 1024)}KB, width=${width}${ext.includes("jpg") ? `, q=${jpegQuality}` : `, pngCL=${pngCompression}, palette=${usePalette}`}`);
            return;
        }

        // Adapt for next pass
        if (ext === ".jpg" || ext === ".jpeg") {
            if (jpegQuality > 45) {
                jpegQuality -= 8; // reduce quality
            } else if (width > 800) {
                width -= 150; // reduce dimension
            } else {
                // last resort, tiny step
                jpegQuality = Math.max(40, jpegQuality - 5);
            }
        } else {
            // PNG: dimension + ensure palette
            usePalette = true;
            if (width > 800) {
                width -= 150;
            } else {
                // As last resort, tiny dimension decrease
                width = Math.max(700, width - 50);
            }
        }
    }

    // Best-effort write even if above target
    if (bestBuffer) {
        await sharp(bestBuffer).toFile(inputPath);
        const fileName = path.basename(inputPath);
        console.warn(`≈ ${fileName} best-effort → ${Math.round(bestBuffer.length / 1024)}KB, width=${width}`);
    }
}

async function run() {
    // Optional args: [pathOrDir] [maxWidth] [targetKB]
    const argPath = process.argv[2];
    const argMaxWidth = parseInt(process.argv[3], 10);
    const argTargetKB = parseInt(process.argv[4], 10);

    const opts = {
        maxWidth: Number.isFinite(argMaxWidth) ? argMaxWidth : undefined,
        targetMaxBytes: Number.isFinite(argTargetKB) ? argTargetKB * 1024 : undefined,
    };

    if (argPath) {
        const input = path.isAbsolute(argPath) ? argPath : path.join(ROOT, argPath);
        if (!fs.existsSync(input)) {
            console.error(`Path not found: ${input}`);
            process.exit(1);
        }

        const stat = fs.statSync(input);
        if (stat.isFile()) {
            // Optimize a single file
            console.log(`Optimizing single file: ${input} ...`);
            await optimizeOnePath(input, opts);
            console.log("Done.");
            return;
        }

        if (stat.isDirectory()) {
            // Optimize all images in the directory
            const files = fs.readdirSync(input).filter(isImage);
            if (!files.length) {
                console.log("No images found to optimize.");
                return;
            }
            console.log(`Optimizing ${files.length} images in ${input} ...`);
            for (const f of files) {
                try {
                    await optimizeOnePath(path.join(input, f), opts);
                } catch (e) {
                    console.error(`Error optimizing ${f}: ${e.message}`);
                }
            }
            console.log("Done.");
            return;
        }
    }

    // Default behavior: optimize hobbies directory
    const INPUT_DIR = DEFAULT_INPUT_DIR;
    if (!fs.existsSync(INPUT_DIR)) {
        console.error(`Directory not found: ${INPUT_DIR}`);
        process.exit(1);
    }
    const files = fs.readdirSync(INPUT_DIR).filter(isImage);
    if (!files.length) {
        console.log("No images found to optimize.");
        return;
    }
    console.log(`Optimizing ${files.length} images in ${INPUT_DIR} ...`);
    for (const f of files) {
        try {
            await optimizeOnePath(path.join(INPUT_DIR, f), {});
        } catch (e) {
            console.error(`Error optimizing ${f}: ${e.message}`);
        }
    }
    console.log("Done.");
}

run();
