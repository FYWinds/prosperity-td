/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-14 14:02:54
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-18 14:38:03
 * @FilePath     : /src/core/ui/components/buttonWithText.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { BaseScreen } from "../screens/baseScreen";
import { Button } from "./button";
import { Component } from "./component";
import { Text } from "./text";
export class ButtonWithText extends Button {
  text: Text;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    parent?: Component | BaseScreen,
    color: string = "#ffffff",
    hoverColor: string = "#dddddd",
    clickColor: string = "#aaaaaa",
    visible?: boolean,
    relative: boolean = false,
    id?: string
  ) {
    super(
      x,
      y,
      width,
      height,
      parent,
      color,
      hoverColor,
      clickColor,
      visible,
      relative,
      id
    );
    const leftMargin = this.width * 0.1;
    const topMargin = this.height * 0.08;
    this.text = new Text(
      text,
      this.x + leftMargin,
      this.y + topMargin,
      this.width - leftMargin * 2,
      this.height - topMargin * 2,
      this
    );
  }

  draw(): void {
    if (!this.visible) return;
    super.draw();
    this.text.draw();
  }
}
