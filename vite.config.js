import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/issuesManager_spa/',    // чтобы работал путь /currency_spa
  server: {
    open: '/issuesManager_spa/'   // чтобы npm run dev открыл именно этот URL
  },
  plugins: [react()],
})
