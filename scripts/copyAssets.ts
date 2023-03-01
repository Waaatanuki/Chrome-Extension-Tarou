const path = require('path')
const fsPromises = require('node:fs/promises')
const copyList = [{ src: 'src/assets/icon', dest: 'dist/assets' }]

async function copyFile(sourcePath, targetPath) {
  await fsPromises.mkdir(targetPath, { recursive: true })

  const sourceFile = await fsPromises.readdir(sourcePath, {
    withFileTypes: true,
  })
  for (const file of sourceFile) {
    const newSourcePath = path.resolve(sourcePath, file.name)
    const newTargetPath = path.resolve(targetPath, file.name)
    if (file.isDirectory()) {
      await copyFile(newSourcePath, newTargetPath)
    }
    await fsPromises.copyFile(newSourcePath, newTargetPath)
  }
}

async function copyListFile() {
  try {
    await fsPromises.copyFile('manifest.json', 'dist/manifest.json')
    copyList.forEach(async item => {
      await copyFile(item.src, item.dest)
    })
  } catch (error) {
    console.log(error)
  }
}

copyListFile()
