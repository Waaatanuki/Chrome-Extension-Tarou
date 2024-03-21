import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config.mjs'
import { r } from './scripts/utils'

export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: r('src/background/index.ts'),
      output: {
        entryFileNames: 'background.mjs',
        extend: true,
      },
    },
  },
})
