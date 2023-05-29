/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 15:37:36
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-04-12 15:53:12
 * @FilePath     : /sketch/ui/hoverable.ts
 * 
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

export interface Hoverable {
    mouseHoverHandler: Array<() => void>;
    mouseInHandler: Array<() => void>;
    mouseOutHandler: Array<() => void>;
    mouseHovering: Boolean;

    onHover(): void;
    onMouseIn(): void;
    onMouseOut(): void;
}