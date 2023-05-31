import { p } from '../../main';
import { Text } from '../ui/components/text';
import { map } from '../ui/screens/gameScreen';
import { Coord } from './coord';
import { BaseTower } from './tower/baseTower';

enum PointerState {
    Blank,
    Tower,
    Sell,
    Upgrade,
    Error,
}

class MousePointer {
    pointerState = PointerState.Blank;
    tower?: BaseTower;
    cooldown: number = 0;

    setTower(tower: BaseTower) {
        this.tower = tower;
        this.pointerState = PointerState.Tower;
        this.addCooldown();
    }

    setUpgrade(): void {
        this.pointerState = PointerState.Upgrade;
        this.addCooldown();
    }

    setSell(): void {
        this.pointerState = PointerState.Sell;
        this.addCooldown();
    }

    setBlank(): void {
        this.pointerState = PointerState.Blank;
    }

    setError(): void {
        this.pointerState = PointerState.Error;
    }

    addCooldown(cooldown: number = 5): void {
        this.cooldown += cooldown;
    }

    render(x: number, y: number): void {
        this.cooldown = this.cooldown > 0 ? this.cooldown - 1 : this.cooldown;
        const cell = map.getCellfromCoord(p.mouseX, p.mouseY);
        switch (this.pointerState) {
            case PointerState.Tower:
                // Draw the grid hightlight
                if (map.grid.isValidCell(cell)) {
                    if (map.checkCellValid(cell)) {
                        p.fill('#57C3D1');
                    } else {
                        p.fill('#AE2E2E');
                    }
                    p.rect(
                        map.x + map.grid.cellSize * cell.x,
                        map.y + map.grid.cellSize * cell.y,
                        map.grid.cellSize,
                        map.grid.cellSize
                    ).noFill();
                }

                // Draw the tower
                this.tower?.draw(x, y, 40);

                break;
            case PointerState.Sell:
                this.drawSell(x, y, cell);
                break;
            case PointerState.Upgrade:
                this.drawUpgrade(x, y, cell);
                break;
            case PointerState.Error:
                // Draw the red X
                p.stroke('#AE2E2E')
                    .strokeWeight(8)
                    .line(x - 20, y - 20, x + 20, y + 20)
                    .line(x + 20, y - 20, x - 20, y + 20)
                    .strokeWeight(1)
                    .noStroke();
                break;
            case PointerState.Blank:
                // Draw the tower range & info
                this.drawBlank(x, y, cell);
                break;
            default:
        }
    }

    drawUpgrade(x: number, y: number, cell: Coord): void {
        // Draw the grid hightlight
        if (map.grid.isValidCell(cell)) {
            if (!map.checkHasTower(cell)) {
                p.fill('#AE2E2E');
            } else {
                p.fill('#57C3D1');
            }
            p.rect(
                map.x + map.grid.cellSize * cell.x,
                map.y + map.grid.cellSize * cell.y,
                map.grid.cellSize,
                map.grid.cellSize
            ).noFill();
        }
        // Draw a upgrade icon
        p.fill('#66CCFF')
            .stroke('#66CCFF')
            .strokeWeight(1)
            .triangle(x - 10, y + 10, x + 10, y + 10, x, y - 10)
            .noFill()
            .noStroke();

        // Draw the upgrade preview info
        const tower = map.getTower(cell);
        if (!tower) return;
        new Text(
            tower.info
                .split('')
                .filter((_v, index) => index < 40)
                .join(''),
            1560,
            350,
            300,
            30
        ).draw();
        new Text(
            tower.info
                .split('')
                .filter((_v, index) => index >= 40)
                .join(''),
            1560,
            380,
            300,
            30
        ).draw();
        // Attack
        new Text(
            `Attack: ${tower.attack} + ${tower.attackPerLevel}`,
            1560,
            410,
            300,
            30
        ).draw();
        // Attack Speed
        new Text(
            `Attack Speed: ${tower.attackSpeed} + ${tower.attackSpeedPerLevel}`,
            1560,
            440,
            300,
            30
        ).draw();
        // Range
        new Text(
            `Range: ${tower.range} + ${tower.rangePerLevel}`,
            1560,
            470,
            300,
            30
        ).draw();
        // Cost
        new Text(`Cost: ${tower.upgradeCost}`, 1560, 500, 300, 30).draw();
    }

    drawSell(x: number, y: number, cell: Coord): void {
        // Draw the grid hightlight
        if (map.grid.isValidCell(cell)) {
            if (!map.checkHasTower(cell)) {
                p.fill('#AE2E2E');
            } else {
                p.fill('#57C3D1');
            }
            p.rect(
                map.x + map.grid.cellSize * cell.x,
                map.y + map.grid.cellSize * cell.y,
                map.grid.cellSize,
                map.grid.cellSize
            ).noFill();
        }
        // Draw the sell icon
        p.fill('#DD6699')
            .stroke('#DD6699')
            .strokeWeight(1)
            .rect(x - 10, y - 10, 20, 20)
            .line(x - 20, y - 20, x + 20, y + 20)
            .line(x - 20, y + 20, x + 20, y - 20)
            .noFill()
            .noStroke();
        // Sell Price info
        const tower = map.getTower(cell);
        if (!tower) return;
        new Text(
            `Sell Price: ${tower.totalCost * 0.8}`,
            1560,
            350,
            300,
            30
        ).draw();
    }

    drawBlank(_x: number, _y: number, cell: Coord): void {
        // DEBUG Draw the range of tower hovering
        const tower = map.towers.find(
            ({ coord }) => coord.x === cell.x && coord.y === cell.y
        );
        if (tower) {
            p.fill(242, 224, 68, 130).circle(
                map.x + map.grid.cellSize * cell.x + map.grid.cellSize / 2,
                map.y + map.grid.cellSize * cell.y + map.grid.cellSize / 2,
                tower.tower.range * 2
            );
        }

        // Draw Tower info
        const towerInfo = map.getTower(cell);
        if (!towerInfo) return;
        new Text(
            towerInfo.info
                .split('')
                .filter((_v, index) => index < 40)
                .join(''),
            1560,
            350,
            300,
            30
        ).draw();
        new Text(
            towerInfo.info
                .split('')
                .filter((_v, index) => index >= 40)
                .join(''),
            1560,
            380,
            300,
            30
        ).draw();
        // Attack
        new Text(`Attack: ${towerInfo.attack}`, 1560, 410, 300, 30).draw();
        // Attack Speed
        new Text(
            `Attack Speed: ${towerInfo.attackSpeed}`,
            1560,
            440,
            300,
            30
        ).draw();
        // Range
        new Text(`Range: ${towerInfo.range}`, 1560, 470, 300, 30).draw();
        // Invested
        new Text(`Invested: ${towerInfo.totalCost}`, 1560, 500, 300, 30).draw();
    }

    onClick(x: number, y: number): void {
        if (this.cooldown > 0) return;
        switch (this.pointerState) {
            case PointerState.Tower:
                if (!this.tower) break;
                if (map.tryPutTower(this.tower, x, y)) {
                    this.tower = undefined;
                } else {
                    this.setError();
                }
                break;
            case PointerState.Sell:
                if (map.trySellTower(x, y)) {
                    this.setBlank();
                } else {
                    this.setError();
                }
                break;
            case PointerState.Upgrade:
                if (map.tryUpgradeTower(x, y)) {
                    this.setBlank();
                } else {
                    this.setError();
                }
                break;
            default:
        }
        setTimeout(() => {
            this.setBlank();
        }, 200);
    }
}

export const mousePointer = new MousePointer();
