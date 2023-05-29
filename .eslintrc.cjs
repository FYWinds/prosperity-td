/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-14 14:18:20
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-04-14 14:22:02
 * @FilePath     : /.eslintrc.cjs
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};
