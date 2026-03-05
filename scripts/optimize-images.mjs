import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { optimize } from 'svgo'

const ROOT_DIR = process.cwd()
const DRY_RUN = process.argv.includes('--dry-run')
const TARGET_DIRS = [
  path.join(ROOT_DIR, 'dist', 'assets'),
  path.join(ROOT_DIR, 'dist', 'images'),
]

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg'])

const bytesToKB = (bytes) => Math.round((bytes / 1024) * 100) / 100

const collectImageFiles = async (directoryPath) => {
  const files = []
  const entries = await readdir(directoryPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectImageFiles(fullPath)))
      continue
    }

    if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }

  return files
}

const optimizeRasterImage = async (inputBuffer, extension) => {
  const image = sharp(inputBuffer, { failOn: 'none' })

  if (extension === '.jpg' || extension === '.jpeg') {
    return image.jpeg({ quality: 80, mozjpeg: true }).toBuffer()
  }

  if (extension === '.png') {
    return image.png({ quality: 80, compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
  }

  return image.webp({ quality: 80, effort: 5 }).toBuffer()
}

const optimizeSvgImage = async (inputContent, filePath) => {
  const result = optimize(inputContent, {
    path: filePath,
    multipass: true,
    plugins: ['preset-default'],
  })

  return Buffer.from(result.data)
}

const optimizeImageFile = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase()
  const before = await stat(filePath)

  const optimizedBuffer = extension === '.svg'
    ? await optimizeSvgImage(await readFile(filePath, 'utf8'), filePath)
    : await optimizeRasterImage(await readFile(filePath), extension)

  if (!DRY_RUN) {
    await writeFile(filePath, optimizedBuffer)
  }

  const afterSize = DRY_RUN ? optimizedBuffer.byteLength : (await stat(filePath)).size

  return {
    before: before.size,
    after: afterSize,
    path: filePath,
  }
}

const main = async () => {
  const existingDirs = []

  for (const directoryPath of TARGET_DIRS) {
    try {
      const directoryStat = await stat(directoryPath)
      if (directoryStat.isDirectory()) {
        existingDirs.push(directoryPath)
      }
    } catch {
      continue
    }
  }

  if (existingDirs.length === 0) {
    console.log('No image directories found. Skipping optimization.')
    return
  }

  const imageFiles = []

  for (const directoryPath of existingDirs) {
    imageFiles.push(...(await collectImageFiles(directoryPath)))
  }

  if (imageFiles.length === 0) {
    console.log('No image files found. Skipping optimization.')
    return
  }

  if (DRY_RUN) {
    console.log('Running in dry-run mode. No files will be written.')
  }

  let totalBefore = 0
  let totalAfter = 0
  let optimizedCount = 0
  const skippedFiles = []

  for (const filePath of imageFiles) {
    try {
      const result = await optimizeImageFile(filePath)
      totalBefore += result.before
      totalAfter += result.after
      optimizedCount += 1
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      skippedFiles.push({ filePath, message })
    }
  }

  const savedBytes = totalBefore - totalAfter
  const savedPercent = totalBefore > 0 ? ((savedBytes / totalBefore) * 100).toFixed(2) : '0.00'

  console.log(`${DRY_RUN ? 'Analyzed' : 'Optimized'} ${optimizedCount} image(s).`)
  console.log(`Size before: ${bytesToKB(totalBefore)} KB`)
  console.log(`Size after: ${bytesToKB(totalAfter)} KB`)
  console.log(`Saved: ${bytesToKB(savedBytes)} KB (${savedPercent}%)`)

  if (skippedFiles.length > 0) {
    console.warn(`Skipped ${skippedFiles.length} image(s) due to read/format issues.`)

    const previewItems = skippedFiles.slice(0, 5)
    for (const item of previewItems) {
      console.warn(`- ${item.filePath}: ${item.message}`)
    }

    if (skippedFiles.length > previewItems.length) {
      console.warn(`- ...and ${skippedFiles.length - previewItems.length} more`)
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error)
  console.error(message)
  process.exit(1)
})
