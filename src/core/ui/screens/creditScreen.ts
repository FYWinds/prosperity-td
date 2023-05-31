import { height, width } from '../../../main';
import { ButtonWithText } from '../components/buttonWithText';
import { Component } from '../components/component';
import { Text } from '../components/text';
import { BaseScreen } from './baseScreen';
import { MainScreen } from './mainScreen';
import { ScreenManager } from './screenManager';

export class CreditScreen extends BaseScreen {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    static _instance: CreditScreen;
    static get instance() {
        this._instance = this._instance ?? new CreditScreen();
        return this._instance;
    }

    constructor() {
        super();
        this.id = 'credit-screen';
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
        // Draw title
        const title = new Text(
            'Credit',
            Math.round(width * 0.4),
            Math.round(height * 0.02),
            Math.round(width * 0.2),
            Math.round(height * 0.1),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'credit-title'
        );
        this.components.push(title);
        // Back button
        const back_button = new ButtonWithText(
            Math.round(width * 0.02),
            Math.round(height * 0.02),
            Math.round(width * 0.14),
            Math.round(height * 0.08),
            'Back',
            this
        );
        this.components.push(back_button);
        back_button.onClickedHandler.push(() => {
            ScreenManager.switchScreen(MainScreen.instance);
        });

        // Designer
        const designer = new Text(
            'Designer: Bill Chen',
            Math.round(width * 0.4),
            Math.round(height * 0.25),
            Math.round(width * 0.2),
            Math.round(height * 0.06),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'credit-designer'
        );
        this.components.push(designer);

        // Programmer
        const programmer = new Text(
            'Programmer: Bill Chen',
            Math.round(width * 0.4),
            Math.round(height * 0.35),
            Math.round(width * 0.2),
            Math.round(height * 0.06),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'credit-programmer'
        );
        this.components.push(programmer);

        // Artist
        const artist = new Text(
            'Artist: Bill Chen',
            Math.round(width * 0.4),
            Math.round(height * 0.45),
            Math.round(width * 0.2),
            Math.round(height * 0.06),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'credit-artist'
        );
        this.components.push(artist);

        // Music
        const music = new Text(
            'Music: Glorious Morning by Waterflame',
            Math.round(width * 0.3),
            Math.round(height * 0.55),
            Math.round(width * 0.4),
            Math.round(height * 0.06),
            this,
            '#ffffff',
            '#ffffff',
            '#ffffff',
            true,
            undefined,
            'credit-music'
        );
        this.components.push(music);
    }

    draw(): void {
        if (!this.visible) return;
        this.components.forEach((component) => {
            component.draw();
        });
    }
}
