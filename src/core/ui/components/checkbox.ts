/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 15:36:47
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-25 14:16:53
 * @FilePath     : /src/core/ui/components/button.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { p } from "../../../main";
import { Clickable } from "../clickable";
import { BaseScreen } from "../screens/baseScreen";
import { Component } from "./component";

export class Checkbox implements Component, Clickable {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    defaultColor: string;
    checkedColor: string;
    visible: boolean;
    parent: Component | BaseScreen;
    checked: boolean = false;

    public onClickedHandler: Array<() => void> = [];
    public mouseDownHandler: Array<() => void> = [];
    public mouseUpHandler: Array<() => void> = [];

    constructor(
        x: number,
        y: number,
        height: number,
        parent?: Component | BaseScreen,
        color: string = "#ffffff",
        checkedColor: string = "#07D270",
        visible?: boolean,
        relative: boolean = false,
        id?: string,
        check: boolean = false,
    ) {
        this.id = id ?? `${parent?.id}-button-${x}-${y}` ?? `bare-button-${x}-${y}`;
        this.x = relative ? parent?.x ?? 0 + x : x;
        this.y = relative ? parent?.y ?? 0 + y : y;
        this.width = height; // Should be a square
        this.height = height;
        this.defaultColor = color;
        this.checkedColor = checkedColor;
        this.visible = visible ?? parent?.visible ?? true;
        this.parent = parent ?? this;
        this.checked = check ?? false;
    }

    draw(): void {
        let size = this.height;
        p.fill(this.defaultColor).stroke(0).strokeWeight(1).rect(this.x, this.y, size, size);

        // Draw the checkmark if the checkbox is checked
        if (this.checked) {
            const offset = size * 0.05;
            size *= 0.9;
            p.fill(this.checkedColor).noStroke().rect(this.x + offset, this.y + offset, size, size);
        }
    }

    remove(): void { }

    onClicked(): void {
        this.checked = !this.checked
        this.onClickedHandler.forEach((handler) => handler());
    }

    mouseDown(): void {
    }
    mouseUp(): void {
    }
}
