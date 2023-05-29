const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
];

class Grid {
    private readonly rows: number;
    private readonly cols: number;
    private readonly grid: number[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    isValidCell(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    isAdjacentCellEmpty(row: number, col: number): boolean {
        return (
            this.isValidCell(row, col) &&
            this.grid[row][col] === 0 &&
            this.getAdjacentCellCount(row, col) === 0
        );
    }

    getAdjacentCellCount(row: number, col: number): number {

        let count = 0;
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (this.isValidCell(newRow, newCol) && this.grid[newRow][newCol] === 1) {
                count++;
            }
        }
        return count;
    }

    generateRandomPath(): number[][] {
        const path: number[][] = [];
        let row = this.rows - 1;
        let col = 0;

        while (row !== 0 || col !== this.cols - 1) {
            path.push([row, col]);
            this.grid[row][col] = 1;

            const directions = [
                [-1, 0], // up
                [1, 0], // down
                [0, -1], // left
                [0, 1], // right
            ];

            const availableDirections = directions.filter(([dx, dy]) =>
                this.isAdjacentCellEmpty(row + dx, col + dy)
            );

            if (availableDirections.length === 0) {
                // Dead end, backtrack to last non-adjacent cell
                const lastIndex = path.length - 1;
                const [lastRow, lastCol] = path[lastIndex];
                this.grid[row][col] = 0;
                path.splice(lastIndex, 1);
                row = lastRow;
                col = lastCol;
            } else {
                const randomDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];
                const [dx, dy] = randomDirection;
                row += dx;
                col += dy;
            }
        }

        path.push([row, col]); // Add the top right corner

        return path;
    }
}