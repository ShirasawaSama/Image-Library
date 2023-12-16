import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://localhost:7071/api'),
  },
})
