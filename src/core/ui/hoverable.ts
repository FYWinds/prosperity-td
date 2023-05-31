export interface Hoverable {
    mouseHoverHandler: Array<() => void>;
    mouseInHandler: Array<() => void>;
    mouseOutHandler: Array<() => void>;
    mouseHovering: boolean;

    onHover(x: number, y: number): void;
    onMouseIn(x: number, y: number): void;
    onMouseOut(x: number, y: number): void;
}
