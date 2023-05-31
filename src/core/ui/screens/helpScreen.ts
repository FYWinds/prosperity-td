import { Image } from 'p5';
import helpImageData from '../../../assets/help.png';
import { height, p, width } from '../../../main';
import { ButtonWithText } from '../components/buttonWithText';
import { Component } from '../components/component';
import { Text } from '../components/text';
import { BaseScreen } from './baseScreen';
import { MainScreen } from './mainScreen';
import { ScreenManager } from './screenManager';

export class HelpScreen extends BaseScreen {
    static instance: HelpScreen;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    helpImage: Image;

    constructor() {
        super();
        this.id = 'help-screen';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = [];
        HelpScreen.instance = this;

        this.init();
        this.helpImage = p.loadImage(helpImageData);
    }

    init() {
        // Draw help title
        const title = new Text(
            'Game Help',
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
            'help-title'
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
    }

    draw(): void {
        if (!this.visible) return;
        this.components.forEach((component) => {
            component.draw();
        });
        p.image(
            this.helpImage,
            width * 0.02,
            height * 0.14,
            width * 0.96,
            height * 0.84
        );
    }
}
