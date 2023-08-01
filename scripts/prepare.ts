import fsPromises from 'node:fs/promises'
import { r } from './utils'

const copyList = [{ src: 'src/assets/icon', dest: 'dist/assets' }]

async function copyFile(sourcePath: string, targetPath: string) {
  await fsPromises.mkdir(targetPath, { recursive: true })

  const sourceFile = await fsPromises.readdir(sourcePath, {
    withFileTypes: true,
  })
  for (const file of sourceFile) {
    const newSourcePath = r(sourcePath, file.name)
    const newTargetPath = r(targetPath, file.name)
    if (file.isDirectory())
      await copyFile(newSourcePath, newTargetPath)

    await fsPromises.copyFile(newSourcePath, newTargetPath)
  }
}

async function copyListFile() {
  try {
    await fsPromises.copyFile('manifest.json', 'dist/manifest.json')
    copyList.forEach(async (item) => {
      await copyFile(item.src, item.dest)
    })
  }
  catch (error) {
    console.log(error)
  }
}

copyListFile()
