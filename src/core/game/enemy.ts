import { p } from '../../main';
import { Drawable } from '../ui/drawable';
import { map } from '../ui/screens/gameScreen';
import { MainScreen } from '../ui/screens/mainScreen';
import { ScreenManager } from '../ui/screens/screenManager';

export default class Enemy implements Drawable {
    x: number = 565;
    y: number = 65;
    speed: number = 1;
    health: number = 100;
    maxHealth: number = 100;
    armor: number = 0;
    attack: number = 0;

    // Random assign a color
    color: number[] = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
    ];

    diameter: number = Math.random() * 10 + 5;

    constructor(public difficulty: number) {
        // Generate random stats based on difficulty
        this.speed = (1 + Math.random() * difficulty * 0.3) / 3;
        if (this.speed > 10) this.speed = 10;
        this.health = -1 + Math.random() * difficulty * 0.05;
        this.armor = Math.random() * difficulty * 0.02;
        this.attack = Math.random() * difficulty * 0.01;
    }

    hurt(damage: number): void {
        this.health -= damage - this.armor;
        if (this.health <= 0) {
            this.death();
        }
    }

    death(): void {
        map.addMoney(Math.floor(5 + Math.random() * this.difficulty * 10));
        map.enemies.splice(map.enemies.indexOf(this), 1);
    }

    doAttack(): void {
        map.life -= this.attack;
        console.log(this);
        this.death();
        if (map.life <= 0) {
            ScreenManager.switchScreen(MainScreen.instance);
        }
    }

    draw(): void {
        // use a circle to represent the enemy
        // random color
        if (Number.isNaN(this.x) || Number.isNaN(this.y)) return;
        p.fill(this.color).circle(this.x, this.y, this.diameter);
        const velocity = this.getVelocity(map.path);
        this.x += velocity.dx;
        this.y += velocity.dy;
    }

    getVelocity(path: number[][]): { dx: number; dy: number } {
        // get velocity based on the astar path from map & speed

        // Get the next point in the path
        const cell = map.getCellfromCoord(this.x, this.y);
        // If the point is already at the end
        // Trigger the attack
        if (
            cell.y === path[path.length - 1][0] &&
            cell.x === path[path.length - 1][1]
        ) {
            this.doAttack();
            return { dx: 0, dy: 0 };
        }

        const nextCellIndex =
            path.findIndex((c) => c[1] === cell.y && c[0] === cell.x) + 1;
        if (nextCellIndex === 0) {
            // Point is not on the path
            // Teleport the point to the nearest cell on the path
            const nearestCell = path.reduce((prev, curr) => {
                const prevDist =
                    Math.abs(prev[1] - cell.y) + Math.abs(prev[0] - cell.x);
                const currDist =
                    Math.abs(curr[1] - cell.y) + Math.abs(curr[0] - cell.x);
                return prevDist < currDist ? prev : curr;
            });
            this.x = 565 + nearestCell[0] * map.grid.cellSize;
            this.y = 65 + nearestCell[1] * map.grid.cellSize;
            return { dx: 0, dy: 0 };
        }

        const nextCell = path[nextCellIndex];
        if (!nextCell) {
            // Point is already at the end
            // Trigger the attack
            this.doAttack();
            return { dx: 0, dy: 0 };
        }
        const nextCellCoord = {
            x: 565 + nextCell[0] * map.grid.cellSize,
            y: 65 + nextCell[1] * map.grid.cellSize,
        };
        // Generate velocity
        const dx = nextCellCoord.x - this.x;
        const dy = nextCellCoord.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const vx = (dx / dist) * this.speed;
        const vy = (dy / dist) * this.speed;
        return { dx: vx, dy: vy };
    }
}
