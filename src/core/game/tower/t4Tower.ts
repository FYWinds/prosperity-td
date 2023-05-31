import { p } from '../../../main';
import { BaseTower } from './baseTower';

export default class T4Tower implements BaseTower {
    level: number = 0;
    baseAttack: number = 1;
    attackPerLevel: number = 1;
    baseAttackSpeed: number = 6;
    attackSpeedPerLevel: number = 4;
    bulletSpeed: number = 10;
    baseCost: number = 600;
    CostAmplifier: number = 2;

    baseRange: number = 300;
    rangePerLevel: number = 200;

    info: string = 'A lazer tower with super high attack speed.';

    draw(x: number, y: number, diameter: number): void {
        diameter *= 0.4;
        p.fill('#BC0AFB').circle(x, y, diameter);
    }

    get attack(): number {
        return this.baseAttack + this.level * this.attackPerLevel;
    }

    get attackSpeed(): number {
        return this.baseAttackSpeed + this.level * this.attackSpeedPerLevel;
    }

    get range(): number {
        return this.baseRange + this.level * this.rangePerLevel;
    }

    get upgradeCost(): number {
        return this.baseCost * this.CostAmplifier ** (this.level + 1);
    }

    get totalCost(): number {
        return this.baseCost * this.CostAmplifier ** this.level;
    }

    copy(): BaseTower {
        const t = new T4Tower();
        t.level = this.level;
        return t;
    }
}
