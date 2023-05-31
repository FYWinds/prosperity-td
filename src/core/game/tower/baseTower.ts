export interface BaseTower {
    level: number;
    baseAttack: number;
    attackPerLevel: number;
    baseAttackSpeed: number; // attacks per second
    attackSpeedPerLevel: number;

    bulletSpeed: number; // in pixels per frame

    baseRange: number; // in pixels
    rangePerLevel: number;

    baseCost: number;
    CostAmplifier: number;

    info: string;

    attack: number;
    attackSpeed: number;
    range: number;
    upgradeCost: number;
    totalCost: number;

    draw(x: number, y: number, diameter: number): void;

    copy(): BaseTower;
}
