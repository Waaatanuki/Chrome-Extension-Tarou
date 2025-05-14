import process from 'node:process'
import OSS from 'ali-oss'

const client = new OSS({
  internal: false,
  accessKeyId: process.env.OSS_ACCESSKEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESSKEY_SECRET || '',
  bucket: process.env.OSS_BUCKET_FILE,
})

async function putFile(name: string, filePath: any) {
  const result = await client.put(name, filePath)
  console.log('上传成功')
  return result
}

const filename = 'changelog.json'
putFile(filename, filename)
