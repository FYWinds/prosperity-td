import { p } from '../../../main';
import { Clickable } from '../clickable';
import { Hoverable } from '../hoverable';
import { BaseScreen } from '../screens/baseScreen';
import { Component } from './component';

export class Button implements Component, Clickable, Hoverable {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    renderColor: string;
    defaultColor: string;
    hoverColor: string;
    clickColor: string;
    visible: boolean;
    parent: Component | BaseScreen;

    public mouseDownHandler: Array<() => void> = [];
    public mouseUpHandler: Array<() => void> = [];
    public mouseHoverHandler: Array<() => void> = [];
    public mouseInHandler: Array<() => void> = [];
    public mouseOutHandler: Array<() => void> = [];
    public onClickedHandler: Array<() => void> = [];
    public mouseHovering: boolean = false;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        parent?: Component | BaseScreen,
        color: string = '#ffffff',
        hoverColor: string = '#dddddd',
        clickColor: string = '#aaaaaa',
        visible?: boolean,
        relative: boolean = false,
        id?: string
    ) {
        this.id =
            id ?? `${parent?.id}-button-${x}-${y}` ?? `bare-button-${x}-${y}`;
        this.x = relative ? parent?.x ?? 0 + x : x;
        this.y = relative ? parent?.y ?? 0 + y : y;
        this.width = width;
        this.height = height;
        this.defaultColor = color;
        this.renderColor = color;
        this.hoverColor = hoverColor;
        this.clickColor = clickColor;
        this.visible = visible ?? parent?.visible ?? true;
        this.parent = parent ?? this;
    }

    draw(): void {
        if (!this.visible) return;
        p.fill(this.renderColor).rect(
            this.x,
            this.y,
            this.width,
            this.height,
            5
        );
    }

    mouseDown(): void {
        this.renderColor = this.clickColor;
        this.mouseDownHandler.forEach((handler) => handler());
    }

    mouseUp(): void {
        this.renderColor = this.defaultColor;
        this.mouseUpHandler.forEach((handler) => handler());
    }

    onClicked(): void {
        this.onClickedHandler.forEach((handler) => handler());
    }

    onHover(): void {
        this.renderColor = this.hoverColor;
        this.mouseHoverHandler.forEach((handler) => handler());
    }

    onMouseIn(): void {
        this.mouseHovering = true;
        this.mouseInHandler.forEach((handler) => handler());
    }

    onMouseOut(): void {
        this.renderColor = this.defaultColor;
        this.mouseHovering = false;
        this.mouseOutHandler.forEach((handler) => handler());
    }
}
