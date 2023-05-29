export interface Clickable {
    mouseDownHandler: Array<() => void>;
    mouseUpHandler: Array<() => void>;
    onClickedHandler: Array<() => void>;

    mouseDown(): void;
    mouseUp(): void;
    onClicked(): void;
}