import { AStarFinder } from 'astar-typescript';
import { p } from '../../main';
import { Component } from '../ui/components/component';
import { BaseScreen } from '../ui/screens/baseScreen';
import SettingsStore from '../utils/settings';
import Bullet from './bullet';
import { Coord } from './coord';
import Enemy from './enemy';
import { BaseTower } from './tower/baseTower';
import T3Tower from './tower/t3Tower';
import T4Tower from './tower/t4Tower';

class Grid {
    readonly cellSize: number; // in pixel
    readonly rows: number;
    readonly cols: number;

    constructor(rows: number, cols: number, cellSize: number) {
        this.cellSize = cellSize;
        this.rows = rows;
        this.cols = cols;
    }

    isValidCell(cell: Coord): boolean {
        return (
            cell.x >= 0 &&
            cell.x < this.cols &&
            cell.y >= 0 &&
            cell.y < this.rows
        );
    }
}

export class Map implements Component {
    id = 'game-map';
    x = 540;
    y = 40;
    width = -1;
    height = -1;
    visible = true;
    grid: Grid = new Grid(20, 20, 50);
    towers: Array<{ coord: Coord; tower: BaseTower; bullets: Bullet[] }> = [];
    enemies: Array<Enemy> = [];
    bullets: Array<Bullet> = [];

    money: number = 200;
    life: number = 100;

    wave: number = 0;

    path: number[][] = [];

    counter = 0;

    constructor(public parent: BaseScreen) {
        this.refresh();
    }

    refresh(): void {
        this.towers = [];
        this.enemies = [];
        this.bullets = [];

        this.money = 600;
        this.life = 100;
        this.wave = 0;

        this.grid = new Grid(20, 20, 50);
        const astar = new AStarFinder({
            grid: { matrix: this.getGridArray() },
            diagonalAllowed: false,
            allowPathAsCloseAsPossible: true,
        });
        this.path = astar.findPath(
            { x: 0, y: 0 },
            { x: this.grid.rows - 1, y: this.grid.cols - 1 }
        );
    }

    draw(): void {
        // Counter stuff
        if (this.counter % 60 === 0) {
            this.money += 1;
        }
        if (this.counter % 600 === 0) {
            this.life += 10;
            this.generateNewWave();
        }
        if (this.counter >= 72000) this.counter = 0;
        this.counter += 1;

        // Draw the grid
        p.stroke(0);
        for (
            let x = this.x;
            x <= this.x + this.grid.cols * this.grid.cellSize;
            x += this.grid.cellSize
        ) {
            p.line(x, this.y, x, this.y + this.grid.cellSize * this.grid.rows);
            // console.log(`Drawed x line at ${x}`);
        }
        for (
            let y = this.y;
            y <= this.y + this.grid.rows * this.grid.cellSize;
            y += this.grid.cellSize
        ) {
            p.line(this.x, y, this.x + this.grid.cellSize * this.grid.cols, y);
            // console.log(`Drawed y line at ${y}`);
        }
        p.noStroke();

        // Draw the enemy spawn point
        p.fill('#FA6A6A').circle(this.x + 25, this.y + 25, 40);

        // Draw the base
        p.fill('#07D270').circle(this.x + 975, this.y + 975, 40);

        // Draw the enemies
        this.enemies.forEach((enemy) => {
            enemy.draw();
        });

        // Draw the towers
        this.towers.forEach(({ coord, tower, bullets }) => {
            tower.draw(
                this.x + this.grid.cellSize * coord.x + this.grid.cellSize / 2,
                this.y + this.grid.cellSize * coord.y + this.grid.cellSize / 2,
                40
            );
            if (this.counter % Math.floor(60 / tower.attackSpeed) === 0) {
                const bullet = this.tryGenerateBullet(coord, tower);
                if (bullet) bullets?.push(bullet);
            }
            bullets?.forEach((bullet) => {
                bullet.draw();
            });
            bullets.splice(
                0,
                bullets.length,
                ...bullets.filter((bullet) => bullet.shouldRemove() === false)
            );
            // Check bullet collision
            bullets.forEach((bullet) => {
                // IF bullet is ray, directly damage the first enemy in the range
                if (bullet.ray) {
                    const nearestEnemy = this.enemies.find(
                        (enemy) =>
                            Math.abs(
                                enemy.x -
                                    (this.x +
                                        this.grid.cellSize * coord.x +
                                        this.grid.cellSize / 2)
                            ) <= tower.range &&
                            Math.abs(
                                enemy.y -
                                    (this.y +
                                        this.grid.cellSize * coord.y +
                                        this.grid.cellSize / 2)
                            ) <= tower.range
                    );
                    if (nearestEnemy) {
                        const damage = bullet.damage;
                        const health = nearestEnemy.health;
                        bullet.damage -= health;
                        nearestEnemy.hurt(damage);
                        bullet.hit = true;
                        // Draw the line for the ray
                        p.stroke('#FF0000')
                            .strokeWeight(2)
                            .line(
                                this.x +
                                    this.grid.cellSize * coord.x +
                                    this.grid.cellSize / 2,
                                this.y +
                                    this.grid.cellSize * coord.y +
                                    this.grid.cellSize / 2,
                                nearestEnemy.x,
                                nearestEnemy.y
                            );
                    }
                    return;
                }
                const nearestEnemy = this.enemies.find(
                    (enemy) =>
                        bullet.x >= enemy.x - 12 &&
                        bullet.x <= enemy.x + 12 &&
                        bullet.y >= enemy.y - 12 &&
                        bullet.y <= enemy.y + 12
                );
                if (nearestEnemy) {
                    const damage = bullet.damage;
                    const health = nearestEnemy.health;
                    bullet.damage -= health;
                    nearestEnemy.hurt(damage);
                    bullet.hit = true;
                }
            });
        });

        if (SettingsStore.getInstance().getSetting('showEnemyPath') === 'on') {
            // DEBUG Draw the path using lines
            p.stroke('#FF0000').strokeWeight(1).noFill();
            for (let i = 0; i < this.path.length - 1; i += 1) {
                const [x1, y1] = this.path[i];
                const [x2, y2] = this.path[i + 1];
                p.line(
                    this.x + x1 * this.grid.cellSize + this.grid.cellSize / 2,
                    this.y + y1 * this.grid.cellSize + this.grid.cellSize / 2,
                    this.x + x2 * this.grid.cellSize + this.grid.cellSize / 2,
                    this.y + y2 * this.grid.cellSize + this.grid.cellSize / 2
                );
            }
            p.noStroke().strokeWeight(1);
        }
    }

    generateNewWave(): void {
        this.wave += 1;
        const enemyDifficulty = Math.floor(this.wave * 1.5) + 10;
        const enemyCount = Math.floor(this.wave * 0.4) + 3;
        for (let i = 0; i < enemyCount; i += 1) {
            this.enemies.push(new Enemy(enemyDifficulty));
        }
    }

    tryGenerateBullet(coord: Coord, tower: BaseTower): Bullet | undefined {
        // Generate Tower Bullet
        // Check if the tower is on attack time

        // Get the first enemy in range
        const _enemy = this.enemies.find(
            (enemy) =>
                Math.abs(
                    this.x +
                        this.grid.cellSize * coord.x +
                        this.grid.cellSize / 2 -
                        enemy.x
                ) <= tower.range &&
                Math.abs(
                    this.y +
                        this.grid.cellSize * coord.y +
                        this.grid.cellSize / 2 -
                        enemy.y
                ) <= tower.range
        );

        if (!_enemy) return;

        // Calculate the direction vector
        const dx =
            _enemy.x -
            (this.x + this.grid.cellSize * coord.x + this.grid.cellSize / 2);
        const dy =
            _enemy.y -
            (this.y + this.grid.cellSize * coord.y + this.grid.cellSize / 2);
        // eslint-disable-next-line consistent-return
        return new Bullet(
            {
                x:
                    this.x +
                    this.grid.cellSize * coord.x +
                    this.grid.cellSize / 2,
                y:
                    this.y +
                    this.grid.cellSize * coord.y +
                    this.grid.cellSize / 2,
            },
            { dx, dy },
            tower.attackSpeed * 5,
            tower.attack,
            tower instanceof T3Tower,
            tower instanceof T4Tower
        );
    }

    addMoney(amount: number): void {
        this.money += amount;
    }

    checkInMap(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.grid.cols * this.grid.cellSize &&
            y >= this.y &&
            y <= this.y + this.grid.rows * this.grid.cellSize
        );
    }

    getCellfromCoord(x: number, y: number): Coord {
        return {
            x: Math.floor((x - this.x) / this.grid.cellSize),
            y: Math.floor((y - this.y) / this.grid.cellSize),
        };
    }

    getGridArray(): number[][] {
        const gridArray: number[][] = [];
        for (let i = 0; i < this.grid.rows; i += 1) {
            gridArray[i] = [];
            for (let j = 0; j < this.grid.cols; j += 1) {
                gridArray[i][j] = 0;
            }
        }
        this.towers.forEach(({ coord }) => {
            gridArray[coord.y][coord.x] = 1;
        });
        // gridArray[0][0] = 1;
        // gridArray[this.grid.rows - 1][this.grid.cols - 1] = 1;
        return gridArray;
    }

    checkCellValid(cell: Coord) {
        return (
            this.grid.isValidCell(cell) &&
            this.getGridArray()[cell.y][cell.x] === 0 &&
            !(cell.x === 0 && cell.y === 0) &&
            !(cell.x === this.grid.rows - 1 && cell.y === this.grid.cols - 1)
        );
    }

    checkHasTower(cell: Coord) {
        return this.towers.some(
            ({ coord }) => coord.x === cell.x && coord.y === cell.y
        );
    }

    tryPutTower(tower: BaseTower, x: number, y: number): boolean {
        const cell = this.getCellfromCoord(x, y);

        // Check currency
        if (this.money < tower.baseCost) {
            return false;
        }

        // Check the slot being occupied by another tower
        if (!this.checkCellValid(cell)) {
            return false;
        }

        // check enemy can go to the end
        // Try update the A* finder
        const grid = this.getGridArray();
        grid[cell.y][cell.x] = 1;
        const astar = new AStarFinder({
            grid: { matrix: grid },
            diagonalAllowed: false,
            heuristic: 'Manhattan',
            includeStartNode: true,
            includeEndNode: true,
        });
        const path = astar.findPath(
            { x: 0, y: 0 },
            { x: this.grid.rows - 1, y: this.grid.cols - 1 }
        );
        if (path.length === 0) return false;
        if (
            path[path.length - 1][0] !== this.grid.rows - 1 ||
            path[path.length - 1][1] !== this.grid.cols - 1
        ) {
            return false;
        }

        this.path = path;
        this.money -= tower.baseCost;
        this.towers.push({ coord: cell, tower, bullets: [] });
        return true;
    }

    getTower(cell: Coord): BaseTower | undefined {
        return this.towers.find(
            ({ coord }) => coord.x === cell.x && coord.y === cell.y
        )?.tower;
    }

    tryUpgradeTower(x: number, y: number): boolean {
        const cell = this.getCellfromCoord(x, y);
        const tower = this.getTower(cell);

        if (!tower) return false;

        // Check currency
        if (this.money < tower.upgradeCost) {
            return false;
        }

        this.money -= tower.upgradeCost;
        tower.level += 1;
        return true;
    }

    trySellTower(x: number, y: number): boolean {
        const cell = this.getCellfromCoord(x, y);
        const tower = this.getTower(cell);

        if (!tower) return false;

        this.money += tower.totalCost * 0.8;
        this.towers = this.towers.filter(
            ({ coord }) => !(coord.x === cell.x && coord.y === cell.y)
        );
        const astar = new AStarFinder({
            grid: { matrix: this.getGridArray() },
            diagonalAllowed: false,
            allowPathAsCloseAsPossible: true,
        });
        this.path = astar.findPath(
            { x: 0, y: 0 },
            { x: this.grid.rows - 1, y: this.grid.cols - 1 }
        );
        return true;
    }
}
