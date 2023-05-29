/*
 * @Author       : FYWinds i@windis.cn
 * @Date         : 2023-05-25 14:37:49
 * @LastEditors  : FYWinds i@windis.cn
 * @LastEditTime : 2023-05-25 15:13:22
 * @FilePath     : /src/core/features/map/map.ts
 * 
 * Copyright (c) 2023 by FYWinds
 * All Rights Reserved.
 * Any modifications or distributions of the file
 * should mark the original author's name.
 */

import { p } from "../../../main";
import { Drawable } from "../../ui/drawable";
import { BaseEnemy } from "../enemy/baseEnemy";
import { BaseTower } from "../tower/baseTower";

export interface Coord {
    x: number;
    y: number;
}

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
        return cell.x >= 0 && cell.x < this.cols && cell.y >= 0 && cell.y < this.rows;
    }

    isCellEmpty(cell: Coord): boolean {
        return this.grid[cell.x][cell.y] === 0
    }
}

export class Map implements Drawable {
    grid: Grid = new Grid(20, 20, 50)
    towers: Array<[BaseTower]> = []
    enemies: Array<[BaseEnemy]> = []

    constructor() {
        this.refresh()
    }

    refresh(): void {
        this.towers = []
        this.enemies = []
    }

    draw(): void {
        const start = { x: 540, y: 40 }
        p.stroke(0);
        for (let x = start.x; x <= start.x + this.grid.cols * this.grid.cellSize; x += this.grid.cellSize) {
            p.line(x, start.y, x, start.y + this.grid.cellSize * this.grid.rows);
        }
        for (let y = start.y; y <= start.y + this.grid.rows * this.grid.cellSize; y += this.grid.cellSize) {
            p.line(y, start.x, y, start.x + this.grid.cellSize * this.grid.cols);
        }
    }

    remove(): void { }
}