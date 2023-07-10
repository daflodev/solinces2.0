import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:'127.0.0.1',
    port: 9000 // Reemplaza este número con el puerto que desees utilizar
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})