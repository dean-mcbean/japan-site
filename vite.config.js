import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue' // Vue 3
//import vue from '@vitejs/plugin-vue2' // Vue 2.7
// import { createVuePlugin } from 'vite-plugin-vue2' // Vue <= 2.6

export default defineConfig({
  base: './',
  publicPath: '/japan/',
  plugins: [
    vue(),
    // createVuePlugin(), // Vue <= 2.6
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html', // default
      },
    },
    outDir: '../../www/japan/'
  },
})