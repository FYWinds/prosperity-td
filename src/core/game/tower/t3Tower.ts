import { p } from '../../../main';
import { BaseTower } from './baseTower';

export default class T3Tower implements BaseTower {
    level: number = 0;
    baseAttack: number = 3;
    attackPerLevel: number = 5;
    baseAttackSpeed: number = 0.5;
    attackSpeedPerLevel: number = 0.3;
    bulletSpeed: number = 2;
    baseCost: number = 320;
    CostAmplifier: number = 2.0;

    baseRange: number = 150;
    rangePerLevel: number = 100;

    info: string = 'A tower with a moderate attack but can go through enemies.';

    draw(x: number, y: number, diameter: number): void {
        diameter *= 0.5;
        p.fill('#D522A3').circle(x, y, diameter);
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
        const t = new T3Tower();
        t.level = this.level;
        return t;
    }
}
