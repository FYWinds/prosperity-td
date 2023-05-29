/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-14 14:01:01
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-24 15:11:37
 * @FilePath     : /vite.config.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
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
    viteCompression({ algorithm: "brotliCompress" }),
    FullReload("src/**/*"),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    brotliSize: false,
  },
});
