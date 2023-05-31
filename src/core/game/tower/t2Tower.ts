import { p } from '../../../main';
import { BaseTower } from './baseTower';

export default class T2Tower implements BaseTower {
    level: number = 0;
    baseAttack: number = 5;
    attackPerLevel: number = 7.5;
    baseAttackSpeed: number = 0.3;
    attackSpeedPerLevel: number = 0.1;
    bulletSpeed: number = 1.5;
    baseCost: number = 230;
    CostAmplifier: number = 1.8;

    baseRange: number = 80;
    rangePerLevel: number = 80;

    info: string = 'A strong tower with high attack but low speed.';

    draw(x: number, y: number, diameter: number): void {
        p.fill('#1C53E1').circle(x, y, diameter);
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
        const t = new T2Tower();
        t.level = this.level;
        return t;
    }
}
