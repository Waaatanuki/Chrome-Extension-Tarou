import { defineConfig } from 'vite'
import packageJson from './package.json'
import { r } from './scripts/utils'
import { sharedConfig } from './vite.config.mjs'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: r('src/contentScripts/index.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content_script.mjs',
        extend: true,
      },
    },
  },
})
