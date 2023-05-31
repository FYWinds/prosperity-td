import { p } from '../../../main';
import { Clickable } from '../../ui/clickable';
import { Component } from '../../ui/components/component';
import { Text } from '../../ui/components/text';
import { Hoverable } from '../../ui/hoverable';
import { BaseScreen } from '../../ui/screens/baseScreen';
import { mousePointer } from '../pointer';
import { BaseTower } from './baseTower';
import T1Tower from './t1Tower';
import T2Tower from './t2Tower';
import T3Tower from './t3Tower';
import T4Tower from './t4Tower';

class TowerSlot implements Component, Hoverable, Clickable {
    towerInfo: Text[] = [];

    constructor(
        public id: string,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public visible: boolean,
        public parent: BaseScreen | Component | null,
        public tower: BaseTower
    ) {
        this.towerInfo.push(
            new Text(
                tower.info
                    .split('')
                    .filter((_v, index) => index < 40)
                    .join(''),
                1560,
                350,
                300,
                30,
                this
            )
        );
        this.towerInfo.push(
            new Text(
                tower.info
                    .split('')
                    .filter((_v, index) => index >= 40)
                    .join(''),
                1560,
                380,
                300,
                30,
                this
            )
        );
        // Attack
        this.towerInfo.push(
            new Text(`Attack: ${tower.baseAttack}`, 1560, 410, 300, 30, this)
        );
        // Attack Speed
        this.towerInfo.push(
            new Text(
                `Attack Speed: ${tower.baseAttackSpeed}`,
                1560,
                440,
                300,
                30,
                this
            )
        );
        // Range
        this.towerInfo.push(
            new Text(`Cost: ${tower.baseCost}`, 1560, 470, 300, 30, this)
        );
    }

    draw(): void {
        // Draw the stroke
        if (this.mouseHovering) {
            // Draw the info
            this.towerInfo.forEach((text) => text.draw());
            p.stroke('#AACCFF');
        } else {
            p.stroke(0);
        }
        p.strokeWeight(6)
            .fill(255)
            .rect(this.x + 3, this.y + 3, this.width - 3, this.height - 3)
            .strokeWeight(1)
            .noStroke();

        // Draw the tower in the middle
        this.tower.draw(
            (this.x * 2 + this.width) / 2,
            (this.y * 2 + this.height) / 2,
            180
        );
    }

    mouseHoverHandler: (() => void)[] = [];
    mouseInHandler: (() => void)[] = [];
    mouseOutHandler: (() => void)[] = [];
    mouseHovering: boolean = false;

    onHover(): void {}

    onMouseIn(): void {
        this.mouseHovering = true;
    }

    onMouseOut(): void {
        this.mouseHovering = false;
    }

    mouseDownHandler: (() => void)[] = [];
    mouseUpHandler: (() => void)[] = [];
    onClickedHandler: (() => void)[] = [];

    mouseDown(): void {}

    mouseUp(): void {}

    onClicked(): void {
        mousePointer.setTower(this.tower.copy());
    }
}

export default class Menu implements Component, Hoverable, Clickable {
    id: string = 'tower-selection-menu';
    x: number = 0;
    y: number = 0;
    width: number = 500;
    height: number = 1080;
    visible: boolean = true;

    towerSlots: Array<TowerSlot> = new Array<TowerSlot>();

    constructor(public parent: BaseScreen) {
        this.towerSlots.push(
            new TowerSlot(
                't1-tower-slot',
                0,
                0,
                300,
                270,
                true,
                this,
                new T1Tower()
            )
        );
        this.towerSlots.push(
            new TowerSlot(
                't2-tower-slot',
                0,
                270,
                300,
                270,
                true,
                this,
                new T2Tower()
            )
        );
        this.towerSlots.push(
            new TowerSlot(
                't3-tower-slot',
                0,
                540,
                300,
                270,
                true,
                this,
                new T3Tower()
            )
        );
        this.towerSlots.push(
            new TowerSlot(
                't4-tower-slot',
                0,
                810,
                300,
                270,
                true,
                this,
                new T4Tower()
            )
        );
    }

    draw(): void {
        // Draw the slots
        this.towerSlots.forEach((ts) => ts.draw());
    }

    mouseDownHandler: (() => void)[] = [];
    mouseUpHandler: (() => void)[] = [];
    onClickedHandler: (() => void)[] = [];

    onClicked(x: number, y: number): void {
        this.towerSlots
            .filter(
                (component) =>
                    x > component.x &&
                    x < component.x + component.width &&
                    y > component.y &&
                    y < component.y + component.height
            )
            .slice(-1)[0]
            ?.onClicked();
    }

    mouseDown(x: number, y: number): void {
        this.towerSlots
            .filter(
                (component) =>
                    x > component.x &&
                    x < component.x + component.width &&
                    y > component.y &&
                    y < component.y + component.height
            )
            .slice(-1)[0]
            ?.mouseDown();
    }

    mouseUp(x: number, y: number): void {
        this.towerSlots
            .filter(
                (component) =>
                    x > component.x &&
                    x < component.x + component.width &&
                    y > component.y &&
                    y < component.y + component.height
            )
            .slice(-1)[0]
            ?.mouseUp();
    }

    mouseHoverHandler: (() => void)[] = [];
    mouseInHandler: (() => void)[] = [];
    mouseOutHandler: (() => void)[] = [];
    mouseHovering: boolean = false;

    onHover(x: number, y: number): void {
        this.towerSlots
            .filter(
                (component) =>
                    x > component.x &&
                    x < component.x + component.width &&
                    y > component.y &&
                    y < component.y + component.height
            )
            .slice(-1)[0]
            ?.onHover();

        this.towerSlots.forEach((component) => {
            if (
                x > component.x &&
                x < component.x + component.width &&
                y > component.y &&
                y < component.y + component.height
            ) {
                if (!(component as any).mouseHovering)
                    (component as any).onMouseIn();
            } else if ((component as any).mouseHovering) {
                (component as any).onMouseOut();
            }
        });
    }

    onMouseIn(): void {}

    onMouseOut(): void {}
}
