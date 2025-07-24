import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 确保在部署时资源路径正确
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    UnoCSS(),
    vue(),
  ],
})