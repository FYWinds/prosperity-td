import { p } from '../../../main';
import { BaseTower } from './baseTower';

export default class T1Tower implements BaseTower {
    level: number = 0;
    baseAttack: number = 1;
    attackPerLevel: number = 1.5;
    baseAttackSpeed: number = 1;
    attackSpeedPerLevel: number = 0.4;
    bulletSpeed: number = 2;
    baseCost: number = 100;
    CostAmplifier: number = 1.5;

    baseRange: number = 100;
    rangePerLevel: number = 100;

    info: string = 'A basic tower with low attack and cost.';

    draw(x: number, y: number, diameter: number): void {
        diameter *= 0.8;
        p.fill('#005408').circle(x, y, diameter);
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
        let totalCost = 0;
        for (let i = 0; i <= this.level; i += 1) {
            totalCost += this.baseCost * this.CostAmplifier ** i;
        }
        return totalCost;
    }

    copy(): BaseTower {
        const t = new T1Tower();
        t.level = this.level;
        return t;
    }
}
