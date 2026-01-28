import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { githubPagesSpa } from '@sctg/vite-plugin-github-pages-spa'

// https://vite.dev/config/
export default defineConfig({
    base: '/wsei_attendme-app/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

    plugins: [vue(), vueDevTools(), githubPagesSpa()],
})
