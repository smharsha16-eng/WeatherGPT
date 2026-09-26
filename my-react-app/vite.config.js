import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://127.0.0.1:8000',
      '/chat': 'http://127.0.0.1:8000',
      '/weather': 'http://127.0.0.1:8000',
      '/forecast': 'http://127.0.0.1:8000',
      '/alerts': 'http://127.0.0.1:8000',
      '/advisories': 'http://127.0.0.1:8000',
      '/climate': 'http://127.0.0.1:8000',
      '/aviation': 'http://127.0.0.1:8000',
      '/nwp-compare': 'http://127.0.0.1:8000',
      '/recommendations': 'http://127.0.0.1:8000',
      '/api': 'http://127.0.0.1:8000',
      '/locations': 'http://127.0.0.1:8000',
    },
  },
})
