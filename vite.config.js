import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    build: {
      lib: {
        entry: 'index.html',
        formats: ['es']
      },
      rollupOptions: {
        external: mode === "production" ? "" : /^lit-element/,
      },
    }
  }
})