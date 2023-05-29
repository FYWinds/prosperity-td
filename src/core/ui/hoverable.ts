export interface Hoverable {
    mouseHoverHandler: Array<() => void>;
    mouseInHandler: Array<() => void>;
    mouseOutHandler: Array<() => void>;
    mouseHovering: boolean;

    onHover(): void;
    onMouseIn(): void;
    onMouseOut(): void;
}
