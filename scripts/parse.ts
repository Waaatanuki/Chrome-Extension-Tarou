import { readFile, writeFile } from 'node:fs/promises'
import { load } from 'cheerio'
import clipboardy from 'clipboardy'

let htmlString: string

try {
  htmlString = await readFile('foo.html', 'utf-8')
}
catch (e) {
  const domStr = clipboardy.readSync()
  htmlString = decodeURIComponent(domStr)
  await writeFile('foo.html', htmlString)
}

const $ = load(htmlString)
