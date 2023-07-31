/* eslint-disable no-console */
import path from 'node:path'
import fsPromises from 'node:fs/promises'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fg from 'fast-glob'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

const pathSrc = path.resolve(__dirname, 'src')

function getEntry() {
  const list: any = {}
  // 遍历文件夹中含有main.ts的文件夹路径
  fg('./src/views/**/main.ts').then((entries) => {
    entries.forEach(async (entry: string) => {
      const pathArr = entry.split('/')
      const name = pathArr[pathArr.length - 2]
      const tempHtml = `src/views/${name}/main.html`
      // 获取模板
      const temp = await fsPromises.readFile(tempHtml)

      // 判断文件是否存在
      fsPromises
        .access(tempHtml)
        .then(() => {})
        .catch(async () => {
          console.log(`创建${name}/main.html文件`)
          const index = temp.toString().indexOf('</body>')
          const content = `${temp.toString().slice(0, index)}<script type="module" src=".${entry}"></script>${temp.toString().slice(index)}`
          await fsPromises.writeFile(tempHtml, content)
        })

      // input中的配置
      list[`assets/${name}`] = path.resolve(__dirname, tempHtml)
    })
  })

  list.background = path.resolve(__dirname, './src/script/background.ts')
  list.content_script = path.resolve(__dirname, './src/script/content_script.ts')
  return list
}

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dirs: [path.resolve(pathSrc, 'composables')],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      vueTemplate: true,
      dts: path.resolve('types', 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      dts: path.resolve('types', 'components.d.ts'),
    }),
    Unocss(),
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getEntry(),
      output: {
        entryFileNames: '[name].js',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
