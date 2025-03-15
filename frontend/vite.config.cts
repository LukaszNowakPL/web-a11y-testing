import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import * as dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        outDir: 'build',
    },
    plugins: [
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint src/ --max-warnings=0',
            },
        }),
    ],
    server: {
        open: true,
        port: 3000,
    },
});
