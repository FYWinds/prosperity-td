import { BaseScreen } from '../screens/baseScreen';
import { Checkbox } from './checkbox';
import { Component } from './component';
import { Text } from './text';

export class CheckboxWithText extends Checkbox {
    text: Text;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        text: string,
        parent?: Component | BaseScreen,
        check: boolean = false,
        color: string = '#ffffff',
        checkedColor: string = '#07D270',
        textColor: string = '#ffffff',
        visible?: boolean,
        relative: boolean = false,
        id?: string
    ) {
        super(
            x,
            y,
            height,
            parent,
            color,
            checkedColor,
            visible,
            relative,
            id,
            check
        );
        this.width = width;
        this.text = new Text(
            text,
            x + height,
            y,
            width - height,
            height,
            this,
            textColor
        );
    }

    draw(): void {
        super.draw();
        this.text.draw();
    }
}
