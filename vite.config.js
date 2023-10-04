import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
// @formatter:off
// prettier-ignore
export default defineConfig({
    plugins: [ vue() ],
    build: { sourcemap: true },
    esbuild: { sourcemap: 'external' },
    css: { postcss: { plugins: [ autoprefixer ] }, devSourcemap: true },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
