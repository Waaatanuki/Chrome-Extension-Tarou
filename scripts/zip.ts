import fs from 'node:fs'
import archiver from 'archiver'
import manifest from '../manifest.json'

function zipDirectory(dirpath: string, destpath: string, outPath: string) {
  const archive = archiver('zip', { zlib: { level: 9 } })
  const stream = fs.createWriteStream(outPath)

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(dirpath, destpath)
      .on('error', err => reject(err))
      .pipe(stream)

    stream.on('close', () => resolve())
    archive.finalize()
  })
}

const dirpath = 'dist'
const destpath = 'Chrome-Extension-Tarou'
const zipFilePath = `${destpath} v${manifest.version}.zip`

zipDirectory(dirpath, destpath, zipFilePath)
