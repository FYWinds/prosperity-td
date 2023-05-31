export interface Clickable {
    mouseDownHandler: Array<() => void>;
    mouseUpHandler: Array<() => void>;
    onClickedHandler: Array<() => void>;

    mouseDown(x: number, y: number): void;
    mouseUp(x: number, y: number): void;
    onClicked(x: number, y: number): void;
}
