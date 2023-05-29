import { Component } from '../components/component';
import { Drawable } from '../drawable';

export abstract class BaseScreen implements Drawable {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
    parent: BaseScreen | null;
    components: Component[];

    constructor() {
        this.id = 'base-screen';
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
        throw new Error('Method not implemented.');
    }

    draw(): void {
        if (!this.visible) return;
        this.components.forEach((component) => {
            component.draw();
        });
    }

    mouseClicked(x: number, y: number): void {
        (
            this.components
                .filter((component) => 'onClicked' in component)
                .filter(
                    (component) =>
                        x > component.x &&
                        x < component.x + component.width &&
                        y > component.y &&
                        y < component.y + component.height
                )
                .at(-1) as any
        )?.onClicked();
    }

    mouseDown(x: number, y: number): void {
        (
            this.components
                .filter((component) => 'mouseDown' in component)
                .filter(
                    (component) =>
                        x > component.x &&
                        x < component.x + component.width &&
                        y > component.y &&
                        y < component.y + component.height
                )
                .at(-1) as any
        )?.mouseDown();
    }

    mouseUp(x: number, y: number): void {
        (
            this.components
                .filter((component) => 'mouseUp' in component)
                .filter(
                    (component) =>
                        x > component.x &&
                        x < component.x + component.width &&
                        y > component.y &&
                        y < component.y + component.height
                )
                .at(-1) as any
        )?.mouseUp();
    }

    mouseMoved(x: number, y: number): void {
        (
            this.components
                .filter((component) => 'onHover' in component)
                .filter(
                    (component) =>
                        x > component.x &&
                        x < component.x + component.width &&
                        y > component.y &&
                        y < component.y + component.height
                )
                .at(-1) as any
        )?.onHover();

        this.components
            .filter((component) => 'onHover' in component)
            .forEach((component) => {
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
}
