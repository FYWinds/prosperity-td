import { p } from '../../../main';
import { Clickable } from '../clickable';
import { Hoverable } from '../hoverable';
import { BaseScreen } from '../screens/baseScreen';
import { Component } from './component';

export class Text implements Component, Clickable, Hoverable {
    id: string;
    text: string;
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
        text: string,
        x: number,
        y: number,
        width: number,
        height: number,
        parent?: Component | BaseScreen,
        color: string = '#000000',
        hoverColor: string = '#000000',
        clickColor: string = '#000000',
        visible?: boolean,
        relative: boolean = false,
        id?: string
    ) {
        this.text = text;
        this.id =
            id ??
            `${parent?.id}-text-${x}-${y}-${text}` ??
            `bare-text-${x}-${y}-${text}`;
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
        // let fontSize = Math.floor(this.width / this.text.length) * 2;
        // Calculate the font size based on button size
        const fontSize = Math.min(this.width / 4, this.height / 2);
        p.fill(this.renderColor)
            .textSize(fontSize)
            .textAlign(p.CENTER, p.CENTER)
            .text(this.text, this.x, this.y, this.width, this.height);
    }

    updateText(text: string): void {
        this.text = text;
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
        this.mouseHoverHandler.forEach((handler) => handler());
    }

    onMouseIn(): void {
        this.mouseHovering = true;
        this.renderColor = this.hoverColor;
        this.mouseInHandler.forEach((handler) => handler());
    }

    onMouseOut(): void {
        this.renderColor = this.defaultColor;
        this.mouseHovering = false;
        this.mouseOutHandler.forEach((handler) => handler());
    }
}
