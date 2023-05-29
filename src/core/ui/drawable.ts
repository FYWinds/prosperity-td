/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 15:30:30
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-04-13 15:00:57
 * @FilePath     : /src/js/core/ui/drawable.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */
export interface Drawable {
  draw(): void;
  remove(): void;
}
