import { extname } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import fg from 'fast-glob'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { UserConfig } from 'vite'
import { r } from './scripts/utils'

export const sharedConfig: UserConfig = {
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core', { 'webextension-polyfill': [['*', 'browser']] }],
      dirs: [r('src/composables')],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: r('types/auto-imports.d.ts'),
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: r('types/components.d.ts'),
    }),
    UnoCSS(),
  ],
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
      'webextension-polyfill',
    ],
  },
}

function getEntry() {
  const list: { [key: string]: string } = {}
  fg.sync('src/views/**/main.ts').forEach((file) => {
    const path = file.slice(0, file.length - extname(file).length)
    const name = path.split('/').at(-2)
    list[`assets/${name}`] = `${r(`${path}.html`)}`
  })
  return list
}

export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: getEntry(),
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})
