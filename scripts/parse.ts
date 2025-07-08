import { writeFile } from 'node:fs/promises'
import { load } from 'cheerio'
import clipboardy from 'clipboardy'

const domStr = clipboardy.readSync()
const htmlString = decodeURIComponent(domStr)
await writeFile('foo.html', htmlString)
const $ = load(htmlString)
