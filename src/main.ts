/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-12 14:53:57
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-24 14:53:17
 * @FilePath     : /src/main.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

// Style Sheet
import { ScreenManager } from "./core/ui/screens/screenManager";
import { initGame } from "./core/utils/init";
import "./style.css";

import p5 from "p5";
export let width: number;
export let height: number;
export let p: p5;

new p5((p5Instance) => {
  p = p5Instance as p5;


  p.setup = function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    p.createCanvas(1920, 1080);
    p.rectMode(p.CORNER).noFill().frameRate(30);

    width = p.width;
    height = p.height;
    console.log(`📏 - Width: ${width} Height: ${height}`);

    initGame()
  };

  p.draw = function draw() {
    p.background(0);
    ScreenManager.draw();

  };

  p.mousePressed = () => {
    ScreenManager.getCurrentScreen().mouseDown(p.mouseX, p.mouseY)
  };

  p.mouseReleased = () => {
    ScreenManager.getCurrentScreen().mouseUp(p.mouseX, p.mouseY)
  };

  p.mouseClicked = () => {
    ScreenManager.getCurrentScreen().mouseClicked(p.mouseX, p.mouseY)
  };

  p.mouseMoved = () => {
    ScreenManager.getCurrentScreen().mouseMoved(p.mouseX, p.mouseY)
  };

  p.windowResized = () => { };
}, document.getElementById("app")!);
