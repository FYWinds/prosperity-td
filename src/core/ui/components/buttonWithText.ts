import { BaseScreen } from '../screens/baseScreen';
import { Button } from './button';
import { Component } from './component';
import { Text } from './text';

export class ButtonWithText extends Button {
    text: Text;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        parent?: Component | BaseScreen,
        color: string = '#ffffff',
        hoverColor: string = '#dddddd',
        clickColor: string = '#aaaaaa',
        visible?: boolean,
        relative: boolean = false,
        id?: string
    ) {
        super(
            x,
            y,
            width,
            height,
            parent,
            color,
            hoverColor,
            clickColor,
            visible,
            relative,
            id
        );
        const leftMargin = this.width * 0.1;
        const topMargin = this.height * 0.08;
        this.text = new Text(
            text,
            this.x + leftMargin,
            this.y + topMargin,
            this.width - leftMargin * 2,
            this.height - topMargin * 2,
            this
        );
    }

    draw(): void {
        if (!this.visible) return;
        super.draw();
        this.text.draw();
    }
}
