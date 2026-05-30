import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isVercel = process.env.VERCEL

export default defineConfig({
  plugins: [vue()],
  base: isVercel ? '/' : '/learnwitheasetutors/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: path => path
      }
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  }
})