/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-04-14 14:02:54
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-25 14:18:09
 * @FilePath     : /src/core/ui/screens/mainScreen.ts
 *
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { height, width } from "../../../main";
import { ButtonWithText } from "../components/buttonWithText";
import { CheckboxWithText } from "../components/checkboxWithText";
import { Component } from "../components/component";
import { Text } from "../components/text";
import { BaseScreen } from "./baseScreen";
import { MainScreen } from "./mainScreen";
import { ScreenManager } from "./screenManager";

export class SettingScreen extends BaseScreen {
    static instance: SettingScreen;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    constructor() {
        super()
        this.id = "settings-screen";
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = [];
        SettingScreen.instance = this;

        this.init();
    }


    init() {
        // Draw help title
        let title = new Text(
            "Game Settings",
            Math.round(width * 0.4),
            Math.round(height * 0.02),
            Math.round(width * 0.20),
            Math.round(height * 0.10),
            this,
            "#ffffff",
            "#ffffff",
            "#ffffff",
            true,
            undefined,
            "settings-title"
        );
        this.components.push(title);

        let backgroundMusic = new CheckboxWithText(
            576, 324, 50, 768, "Enable Background Music", this, true
        )
        this.components.push(backgroundMusic)

        // Back button
        let back_button = new ButtonWithText(
            Math.round(width * 0.02),
            Math.round(height * 0.02),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            "Back",
            this
        );
        this.components.push(back_button);
        back_button.onClickedHandler.push(() => {
            ScreenManager.switchScreen(MainScreen.instance)
        });
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
}
