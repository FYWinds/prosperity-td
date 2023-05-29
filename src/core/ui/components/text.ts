/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 15:36:47
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-24 14:09:01
 * @FilePath     : /src/core/ui/components/text.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */
import { p } from "../../../main";
import { Clickable } from "../clickable";
import { Hoverable } from "../hoverable";
import { BaseScreen } from "../screens/baseScreen";
import { Component } from "./component";

export class Text implements Component, Clickable, Hoverable {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  renderColor: string;
  defaultColor: string;
  hoverColor: string;
  clickColor: string;
  visible: boolean;
  parent: Component | BaseScreen;

  public mouseDownHandler: Array<() => void> = [];
  public mouseUpHandler: Array<() => void> = [];
  public mouseHoverHandler: Array<() => void> = [];
  public mouseInHandler: Array<() => void> = [];
  public mouseOutHandler: Array<() => void> = [];
  public onClickedHandler: Array<() => void> = [];
  public mouseHovering: Boolean = false;

  constructor(
    text: string,
    x: number,
    y: number,
    width: number,
    height: number,
    parent?: Component | BaseScreen,
    color: string = "#000000",
    hoverColor: string = "#000000",
    clickColor: string = "#000000",
    visible?: boolean,
    relative: boolean = false,
    id?: string
  ) {
    this.text = text;
    this.id =
      id ??
      `${parent?.id}-text-${x}-${y}-${text}` ??
      `bare-text-${x}-${y}-${text}`;
    this.x = relative ? parent?.x ?? 0 + x : x;
    this.y = relative ? parent?.y ?? 0 + y : y;
    this.width = width;
    this.height = height;
    this.defaultColor = color;
    this.renderColor = color;
    this.hoverColor = hoverColor;
    this.clickColor = clickColor;
    this.visible = visible ?? parent?.visible ?? true;
    this.parent = parent ?? this;
  }

  draw(): void {
    if (!this.visible) return;
    // let fontSize = Math.floor(this.width / this.text.length) * 2;
    // Calculate the font size based on button size
    let fontSize = Math.min(this.width / 4, this.height / 2);
    // Set the text properties
    p.fill(this.renderColor).textSize(fontSize).textAlign(p.CENTER, p.CENTER)
      .text(this.text, this.x, this.y, this.width, this.height);
  }
  remove(): void { }
  mouseDown(): void {
    this.renderColor = this.clickColor;
    this.mouseDownHandler.forEach((handler) => handler());
  }

  mouseUp(): void {
    this.renderColor = this.defaultColor
    this.mouseUpHandler.forEach((handler) => handler());
  }

  onClicked(): void {
    this.onClickedHandler.forEach((handler) => handler());
  }

  onHover(): void {
    this.renderColor = this.hoverColor
    this.mouseHoverHandler.forEach((handler) => handler());
  }

  onMouseIn(): void {
    this.mouseHovering = true
    this.mouseInHandler.forEach((handler) => handler());
  }

  onMouseOut(): void {
    this.renderColor = this.defaultColor
    this.mouseHovering = false
    this.mouseOutHandler.forEach((handler) => handler());
  }
}
