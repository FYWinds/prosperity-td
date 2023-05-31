import music from '../../../assets/bgm.mp3';
import { height, width } from '../../../main';
import SettingsStore from '../../utils/settings';
import { ButtonWithText } from '../components/buttonWithText';
import { CheckboxWithText } from '../components/checkboxWithText';
import { Component } from '../components/component';
import { Text } from '../components/text';
import { BaseScreen } from './baseScreen';
import { MainScreen } from './mainScreen';
import { ScreenManager } from './screenManager';

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

    bgm: HTMLAudioElement;

    constructor() {
        super();
        this.id = 'settings-screen';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = [];
        SettingScreen.instance = this;

        this.bgm = new Audio(music);

        this.init();
    }

    init() {
        // Draw help title
        const title = new Text(
            'Game Settings',
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
            'settings-title'
        );
        this.components.push(title);

        const backgroundMusic = new CheckboxWithText(
            576,
            324,
            768,
            50,
            'Enable Background Music',
            this,
            SettingsStore.getInstance().getSetting('backgroundMusic') === 'on'
        );
        this.components.push(backgroundMusic);
        backgroundMusic.onClickedHandler.push(() => {
            // Change settings
            SettingsStore.getInstance().setSetting(
                'backgroundMusic',
                backgroundMusic.checked ? 'on' : 'off'
            );
            this.bgm.currentTime = 0;
            // eslint-disable-next-line no-unused-expressions
            backgroundMusic.checked ? this.bgm.play() : this.bgm.pause();
        });
        if (
            SettingsStore.getInstance().getSetting('backgroundMusic') === 'on'
        ) {
            this.bgm.loop = true;
            this.bgm.play();
        }

        const showEnemyPath = new CheckboxWithText(
            576,
            384,
            768,
            50,
            'Show Enemy Path',
            this,
            SettingsStore.getInstance().getSetting('showEnemyPath') === 'on'
        );
        this.components.push(showEnemyPath);
        showEnemyPath.onClickedHandler.push(() => {
            // Change settings
            SettingsStore.getInstance().setSetting(
                'showEnemyPath',
                showEnemyPath.checked ? 'on' : 'off'
            );
        });

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
    }
}
