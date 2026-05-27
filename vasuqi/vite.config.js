import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function htmlPartialsPlugin() {
  return {
    name: 'html-partials',
    enforce: 'pre',
    transformIndexHtml(html) {
      return html.replace(
        /<!--@include\s+"([^"]+)"\s*-->/g,
        (_, file) => {
          const resolved = path.resolve(__dirname, file)
          if (path.relative(__dirname, resolved).startsWith('..')) {
            throw new Error(`[html-partials] include path escapes project root: ${file}`)
          }
          try {
            return fs.readFileSync(resolved, 'utf-8')
          } catch {
            throw new Error(`[html-partials] partial not found: ${file}`)
          }
        }
      )
    }
  }
}

export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [tailwindcss(), htmlPartialsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        news: 'news-documentation.html',
        about: 'about.html',
        contact: 'contact.html',
      },
    },
  },
})
