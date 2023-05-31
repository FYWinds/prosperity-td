import { height, width } from '../../../main';
import { ButtonWithText } from '../components/buttonWithText';
import type { Component } from '../components/component';
import { Text } from '../components/text';
import { BaseScreen } from './baseScreen';
import { CreditScreen } from './creditScreen';
import { GameScreen } from './gameScreen';
import { HelpScreen } from './helpScreen';
import { ScreenManager } from './screenManager';
import { SettingScreen } from './settingScreen';

export class MainScreen extends BaseScreen {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    static _instance: MainScreen;
    static get instance() {
        this._instance = this._instance ?? new MainScreen();
        return this._instance;
    }

    constructor() {
        super();

        this.id = 'main-screen';
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
        // Main Title
        const title = new Text(
            'Prosperity TD',
            Math.round(width * 0.4),
            Math.round(height * 0.1),
            Math.round(width * 0.2),
            Math.round(height * 0.2),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'main-title'
        );
        this.components.push(title);
        // Play Button
        const play_button = new ButtonWithText(
            Math.round(width * 0.43),
            Math.round(height * 0.34),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            'Play',
            this
        );
        this.components.push(play_button);
        play_button.onClickedHandler.push(() => {
            GameScreen.instance.init();
            ScreenManager.switchScreen(GameScreen.instance);
            console.log('Play Button Clicked');
        });
        // Settings Button
        const settings_button = new ButtonWithText(
            Math.round(width * 0.43),
            Math.round(height * 0.44),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            'Settings',
            this
        );
        this.components.push(settings_button);
        settings_button.onClickedHandler.push(() => {
            ScreenManager.switchScreen(SettingScreen.instance);
            console.log('Settings Button Clicked');
        });
        // Help Button
        const help_button = new ButtonWithText(
            Math.round(width * 0.43),
            Math.round(height * 0.54),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            'Help',
            this
        );
        this.components.push(help_button);
        help_button.onClickedHandler.push(() => {
            ScreenManager.switchScreen(HelpScreen.instance);
            console.log('Help Button Clicked');
        });
        // Credits Button
        const credits_button = new ButtonWithText(
            Math.round(width * 0.43),
            Math.round(height * 0.64),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            'Credits',
            this
        );
        this.components.push(credits_button);
        credits_button.onClickedHandler.push(() => {
            ScreenManager.switchScreen(CreditScreen.instance);
            console.log('Credits Button Clicked');
        });
        // Version Text
        const version_text = new Text(
            'Version: 0.0.1',
            Math.round(width * 0.9),
            Math.round(height * 0.95),
            Math.round(width * 0.1),
            Math.round(height * 0.05),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff'
        );
        this.components.push(version_text);
    }

    draw(): void {
        if (!this.visible) return;
        this.components.forEach((component) => {
            component.draw();
        });
    }
}
