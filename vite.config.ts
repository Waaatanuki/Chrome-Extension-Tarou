import { extname } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fg from 'fast-glob'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { r } from './scripts/utils'

function getEntry() {
  const list: { [key: string]: string } = {}
  fg.sync('src/views/**/main.ts').forEach((file) => {
    const path = file.slice(0, file.length - extname(file).length)
    const name = path.split('/').at(-2)
    list[`assets/${name}`] = `${r(`${path}.html`)}`
  })

  list.background = r('src/script/background.ts')
  list.content_script = r('src/script/content_script.ts')
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
      dirs: [r('src/composables')],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: r('types/auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: r('types/components.d.ts'),
    }),
    Unocss(),
  ],
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getEntry(),
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
