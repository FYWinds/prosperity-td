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
    components: Array<Component>;

    constructor() {
        this.id = 'base-screen';
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visible = true;
        this.parent = null;
        this.components = new Array<Component>();

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
                .slice(-1)[0] as any
        )?.onClicked(x, y);
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
                .slice(-1)[0] as any
        )?.mouseDown(x, y);
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
                .slice(-1)[0] as any
        )?.mouseUp(x, y);
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
                .slice(-1)[0] as any
        )?.onHover(x, y);

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
                        (component as any).onMouseIn(x, y);
                } else if ((component as any).mouseHovering) {
                    (component as any).onMouseOut(x, y);
                }
            });
    }
}
