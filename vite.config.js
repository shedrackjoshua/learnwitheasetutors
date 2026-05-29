import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => {
  const common = {
    plugins: [vue()]
  }

  if (command === 'serve') {
    // Development config
    return {
      ...common,
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
    }
  }

  // Production config (GitHub Pages)
  return {
    ...common,
    base: process.env.VERCEL ? '/learnwitheasetutors/' : '/'
  }
});