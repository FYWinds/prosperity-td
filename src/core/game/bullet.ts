import { p } from '../../main';
import { Drawable } from '../ui/drawable';
import { map } from '../ui/screens/gameScreen';

export default class Bullet implements Drawable {
    x: number;
    y: number;

    hit: boolean = false;

    constructor(
        public start: { x: number; y: number },
        public direction: { dx: number; dy: number },
        public speed: number,
        public damage: number,
        public pass: boolean = false,
        public ray: boolean = false
    ) {
        this.x = start.x;
        this.y = start.y;

        // Resize the dx, dy to make sure the speed is correct
        const length = Math.sqrt(direction.dx ** 2 + direction.dy ** 2);
        this.direction.dx = (direction.dx / length) * speed;
        this.direction.dy = (direction.dy / length) * speed;
    }

    draw(): void {
        this.x += this.direction.dx;
        this.y += this.direction.dy;

        if (this.ray) {
            // calculate the end point of the ray
            const endX = this.start.x + this.direction.dx * 1000;
            const endY = this.start.y + this.direction.dy * 1000;
            const end = calculateIntersectionWithMapBoundary(
                { p1: this.start, p2: { x: endX, y: endY } },
                { minX: 540, minY: 40, maxX: 1540, maxY: 1040 }
            );
            if (!end) return;

            p.stroke('#000000')
                .line(this.start.x, this.start.y, end.x, end?.y)
                .noStroke();
            this.hit = true; // ray only hit once
        } else {
            p.fill('#000000').circle(this.x, this.y, 6);
        }
    }

    shouldRemove(): boolean {
        if (!map.checkInMap(this.x, this.y)) return true;
        return !this.pass ? this.hit : this.damage <= 0;
    }
}

interface Point {
    x: number;
    y: number;
}

interface Line {
    p1: Point;
    p2: Point;
}

interface MapBounds {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

function calculateIntersectionWithMapBoundary(
    line: Line,
    mapBounds: MapBounds
): Point | null {
    const x1 = line.p1.x;
    const y1 = line.p1.y;
    const x2 = line.p2.x;
    const y2 = line.p2.y;

    // Check if line is vertical
    if (x1 === x2) {
        // Check if line intersects with vertical boundary
        if (x1 < mapBounds.minX || x1 > mapBounds.maxX) {
            return null; // No intersection
        }

        // Calculate y-coordinate of intersection
        const intersectionY = Math.max(
            mapBounds.minY,
            Math.min(mapBounds.maxY, Math.max(y1, y2))
        );
        return { x: x1, y: intersectionY };
    }

    // Calculate slope and y-intercept of the line
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;

    // Check if line intersects with horizontal boundaries
    if (m !== 0) {
        const intersectionXMin = Math.max(
            mapBounds.minX,
            Math.min(mapBounds.maxX, (mapBounds.minY - b) / m)
        );
        const intersectionXMax = Math.max(
            mapBounds.minX,
            Math.min(mapBounds.maxX, (mapBounds.maxY - b) / m)
        );

        // Check if intersection points are within line segment range
        if (
            (intersectionXMin >= x1 && intersectionXMin <= x2) ||
            (intersectionXMax >= x1 && intersectionXMax <= x2)
        ) {
            const intersectionX = x2 > x1 ? intersectionXMin : intersectionXMax;
            const intersectionY = m * intersectionX + b;
            return { x: intersectionX, y: intersectionY };
        }
    }

    return null;
}
