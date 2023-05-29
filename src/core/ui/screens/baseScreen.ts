/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 15:22:26
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-25 14:07:07
 * @FilePath     : /src/core/ui/screens/baseScreen.ts
 * 
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { Component } from "../components/component";
import { Drawable } from "../drawable";

export abstract class BaseScreen implements Drawable {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    constructor() {
        this.id = "base-screen";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = [];

        this.init();
    }

    init() {
        throw new Error("Method not implemented.");
    }

    draw(): void {
        if (!this.visible) return;
        this.components.forEach((component) => {
            component.draw();
        });
    }

    remove(): void {
        throw new Error("Method not implemented.");
    }


    mouseClicked(x: number, y: number): void {
        (this.components.filter((component) => { return "onClicked" in component }).filter((component) => {
            return (x > component.x && x < component.x + component.width) && (y > component.y && y < component.y + component.height)
        }).at(-1) as any)?.onClicked();
    }

    mouseDown(x: number, y: number): void {
        (this.components.filter((component) => { return "mouseDown" in component }).filter((component) => {
            return (x > component.x && x < component.x + component.width) && (y > component.y && y < component.y + component.height)
        }).at(-1) as any)?.mouseDown();
    }

    mouseUp(x: number, y: number): void {
        (this.components.filter((component) => { return "mouseUp" in component }).filter((component) => {
            return (x > component.x && x < component.x + component.width) && (y > component.y && y < component.y + component.height)
        }).at(-1) as any)?.mouseUp();
    }

    mouseMoved(x: number, y: number): void {
        (this.components.filter((component) => { return "onHover" in component }).filter((component) => {
            return (x > component.x && x < component.x + component.width) && (y > component.y && y < component.y + component.height)
        }).at(-1) as any)?.onHover();

        this.components.filter((component) => { return "onHover" in component }).forEach(
            (component) => {
                if ((x > component.x && x < component.x + component.width) && (y > component.y && y < component.y + component.height)) {
                    if (!(component as any).mouseHovering) (component as any).onMouseIn();
                } else {
                    if ((component as any).mouseHovering) {
                        (component as any).onMouseOut();
                    }

                }
            }
        )
    }
}