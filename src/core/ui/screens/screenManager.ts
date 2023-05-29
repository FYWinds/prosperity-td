import { BaseScreen } from './baseScreen';

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
        this.currentScreen = [screen];
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
