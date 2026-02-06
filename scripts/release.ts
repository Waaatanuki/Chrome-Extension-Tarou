import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

/**
 * 从 changelog.json 中读取更新说明，用于 GitHub Release
 */
function generateReleaseNotes() {
  const changelogPath = path.join(process.cwd(), 'changelog.json')
  const changelog = JSON.parse(fs.readFileSync(changelogPath, 'utf-8'))[0]

  const releaseNotes = `
### 更新内容
${changelog.comment}
`
  const notesFile = path.join(process.cwd(), 'release-notes.md')
  fs.writeFileSync(notesFile, releaseNotes.trim())
  console.log('发布说明已生成:', notesFile)
}

generateReleaseNotes()
