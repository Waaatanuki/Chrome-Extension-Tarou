import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config.mjs'
import { r } from './scripts/utils'
import packageJson from './package.json'

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
