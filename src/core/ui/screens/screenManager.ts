/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-05-18 14:01:43
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-24 14:43:14
 * @FilePath     : /src/core/ui/screens/screenManager.ts
 * 
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { BaseScreen } from "./baseScreen";

export class ScreenManager {
    static screens: Map<string, BaseScreen> = new Map<string, BaseScreen>();
    static currentScreen: Array<BaseScreen> = new Array<BaseScreen>();

    static registerScreen(screen: BaseScreen): void {
        this.screens.set(screen.id, screen);
    }

    static getScreen(id: string): BaseScreen | undefined {
        return this.screens.get(id);
    }

    static showScreen(screen: BaseScreen): void {
        this.currentScreen.push(screen);
    }

    static switchScreen(screen: BaseScreen): void {
        this.currentScreen = [screen]
    }

    static removeScreen(): void {
        this.currentScreen.pop();
    }

    static getCurrentScreen(): BaseScreen {
        return this.currentScreen[this.currentScreen.length - 1];
    }

    static draw(): void {
        this.currentScreen.forEach((screen) => {
            screen.draw();
        });
    }
}   