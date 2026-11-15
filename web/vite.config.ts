import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// GitHub Pages 部署在 https://<user>.github.io/Mac-Tips/ 下，需要 base 前缀
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Mac-Tips/' : '/',
  plugins: [react(), tailwindcss(), imagetools()],
  // 仓库内容（*.md、图标）在 web/ 之外，放开 fs 访问
  server: { fs: { allow: ['..'] } },
  build: { chunkSizeWarningLimit: 900 },
})
