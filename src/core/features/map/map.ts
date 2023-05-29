import { p } from '../../../main';
import { Component } from '../../ui/components/component';
import { BaseScreen } from '../../ui/screens/baseScreen';
import { BaseEnemy } from '../enemy/baseEnemy';
import { BaseTower } from '../tower/baseTower';
import { Coord } from './coord';

class Grid {
    readonly cellSize: number; // in pixel
    readonly rows: number;
    readonly cols: number;
    private readonly grid: number[][];

    constructor(rows: number, cols: number, cellSize: number) {
        this.cellSize = cellSize;
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    isValidCell(cell: Coord): boolean {
        return (
            cell.x >= 0 &&
            cell.x < this.cols &&
            cell.y >= 0 &&
            cell.y < this.rows
        );
    }

    isCellEmpty(cell: Coord): boolean {
        return this.grid[cell.x][cell.y] === 0;
    }
}

export class Map implements Component {
    id = 'game-map';
    x = 540;
    y = 40;
    width = -1;
    height = -1;
    visible = true;
    parent: Component | BaseScreen | null = this;
    grid: Grid = new Grid(20, 20, 50);
    towers: Array<[BaseTower]> = [];
    enemies: Array<[BaseEnemy]> = [];

    constructor() {
        this.refresh();
    }

    refresh(): void {
        this.towers = [];
        this.enemies = [];
    }

    draw(): void {
        p.stroke(0);
        for (
            let x = this.x;
            x <= this.x + this.grid.cols * this.grid.cellSize;
            x += this.grid.cellSize
        ) {
            p.line(x, this.y, x, this.y + this.grid.cellSize * this.grid.rows);
        }
        for (
            let y = this.y;
            y <= this.y + this.grid.rows * this.grid.cellSize;
            y += this.grid.cellSize
        ) {
            p.line(y, this.x, y, this.x + this.grid.cellSize * this.grid.cols);
        }
        p.noStroke();
    }
}
