import { p } from '../../../main';
import { Map } from '../../features/map/map';
import { Component } from '../components/component';
import { BaseScreen } from './baseScreen';

export class GameScreen extends BaseScreen {
    static instance: GameScreen;
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

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
        GameScreen.instance = this;

        this.init();
    }

    init() {
        // Map
        const map = new Map();
        this.components.push(map);
    }

    draw(): void {
        if (!this.visible) return;
        p.background(0);
        this.components.forEach((component) => {
            component.draw();
        });
    }
}
