import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    plugins: [
        // obfuscatorPlugin({
        //   matchFile: (path) => {
        //     // console.log(path);
        //     if (/(src).*(ts|js)/.test(path)) {
        //       // console.log(path);
        //       return true;
        //     }
        //     return false;
        //   },
        //   options: {
        //     optionsPreset: "high-obfuscation",
        //   },
        // }),
        viteCompression({ algorithm: 'brotliCompress' }),
        FullReload('**', { always: true, log: true, root: 'src' }),
    ],
    build: {
        minify: 'esbuild',
        chunkSizeWarningLimit: 1000,
        brotliSize: false,
    },
    server: {
        hmr: false,
    },
});
