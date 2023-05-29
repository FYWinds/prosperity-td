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

import { BaseScreen } from "../screens/baseScreen";
import { Checkbox } from "./checkbox";
import { Component } from "./component";
import { Text } from "./text";

export class CheckboxWithText extends Checkbox {
    text: Text

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        parent?: Component | BaseScreen,
        check: boolean = false,
        color: string = "#ffffff",
        checkedColor: string = "#07D270",
        visible?: boolean,
        relative: boolean = false,
        id?: string,
    ) {
        super(
            x, y, height, parent, color, checkedColor, visible, relative, id, check
        )
        this.width = width
        this.text = new Text(text, x + height, y, width - height, height, this)
    }

    draw(): void {
        super.draw()
        this.text.draw()
    }
}
