import { p } from '../../../main';
import { Map } from '../../game/map';
import { mousePointer } from '../../game/pointer';
import Menu from '../../game/tower/menu';
import { ButtonWithText } from '../components/buttonWithText';
import { Component } from '../components/component';
import { Text } from '../components/text';
import { BaseScreen } from './baseScreen';
import { MainScreen } from './mainScreen';
import { ScreenManager } from './screenManager';

export let map: Map;

export class GameScreen extends BaseScreen {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    waveInfo: Text = new Text('Wave: 0', 1560, 40, 150, 30, this);
    moneyInfo: Text = new Text('Money: 0', 1560, 80, 150, 30, this);
    lifeInfo: Text = new Text('Life: 100', 1560, 120, 150, 30, this);

    static _instance: GameScreen;
    static get instance() {
        this._instance = this._instance ?? new GameScreen();
        return this._instance;
    }

    constructor() {
        super();
        this.id = 'game-screen';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = [];
    }

    init() {
        // Map
        map = new Map(this);
        this.components.push(map);

        // Tower Menu
        this.components.push(new Menu(this));

        // Info
        this.components.push(this.waveInfo);
        this.components.push(this.moneyInfo);
        this.components.push(this.lifeInfo);

        // Upgrade Button
        const upgradeButton = new ButtonWithText(
            1560,
            160,
            150,
            60,
            'Upgrade',
            this,
            '#66CCFF',
            '#77CCFF',
            '#88CCFF'
        );
        this.components.push(upgradeButton);
        upgradeButton.onClickedHandler.push(() => {
            mousePointer.setUpgrade();
        });
        // Sell Button
        const sellButton = new ButtonWithText(
            1560,
            250,
            150,
            60,
            'Sell',
            this,
            '#DD6699',
            '#EE6699',
            '#FF6699'
        );
        this.components.push(sellButton);
        sellButton.onClickedHandler.push(() => {
            mousePointer.setSell();
        });

        // Exit Button
        const exitButton = new ButtonWithText(
            1560,
            900,
            150,
            60,
            'Exit',
            this,
            '#FFCC66',
            '#FFDD66',
            '#FFEE66'
        );
        this.components.push(exitButton);
        exitButton.onClickedHandler.push(() => {
            this.components = [];
            ScreenManager.switchScreen(MainScreen.instance);
        });
    }

    draw(): void {
        if (!this.visible) return;
        p.background('#D9D9D9');
        this.components.forEach((component) => {
            component.draw();
        });

        // Upgrade Info Text
        this.waveInfo.updateText(`Wave: ${map.wave}`);
        this.moneyInfo.updateText(`Money: ${map.money}`);
        this.lifeInfo.updateText(`Life: ${Math.round(map.life)}`);

        // Draw mouse pointer/frame by frame
        mousePointer.render(p.mouseX, p.mouseY);
    }

    mouseClicked(x: number, y: number): void {
        super.mouseClicked(x, y);
        mousePointer.onClick(x, y);
    }
}
