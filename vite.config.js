import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: '@tests',
        replacement: fileURLToPath(new URL('./src/tests', import.meta.url)),
      },
      {
        find: '@shapes',
        replacement: fileURLToPath(new URL('./src/shapes', import.meta.url)),
      },
      {
        find: '@styles',
        replacement: fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
      {
        find: '@lotties',
        replacement: fileURLToPath(new URL('./src/lotties', import.meta.url)),
      },
      {
        find: '@views',
        replacement: fileURLToPath(new URL('./src/views', import.meta.url)),
      },
      {
        find: '@stores',
        replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
      },
      {
        find: '@utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
      { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ],
  },
})
