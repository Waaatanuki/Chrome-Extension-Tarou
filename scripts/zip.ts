import fs from 'node:fs'
import path from 'node:path'
import { zip } from 'zip-a-folder'

function copyFolderSync(source: string, target: string) {
  // 创建目标文件夹
  fs.mkdirSync(target, { recursive: true })

  // 读取源文件夹中的所有文件和子文件夹
  const files = fs.readdirSync(source)

  // 遍历文件和子文件夹
  files.forEach((file) => {
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)

    // 如果是文件夹，则递归拷贝子文件夹
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, targetPath)
    }
    else {
      // 拷贝文件
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

function deleteFolderRecursive(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath)
      }
      else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    // 删除空文件夹
    fs.rmdirSync(folderPath)
  }
}

const sourceFolder = 'dist'
const targetFolder = 'Chrome-Extension-Tarou'

async function copyANDzip() {
  copyFolderSync(sourceFolder, targetFolder)
  await zip('Chrome-Extension-Tarou', 'Chrome-Extension-Tarou.zip')
  deleteFolderRecursive(targetFolder)
}

copyANDzip()
