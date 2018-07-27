import { Hex } from '@hexagine/index';
import { Tower } from './Tower';

export class TowerFactory<T extends Tower> {
    private TowerType: { new(position: Hex): Tower };

    constructor(TowerType: { new(position: Hex): T }, public metadata: ITowerMetadata) {
        this.TowerType = TowerType;
    }

    createInstance(position: Hex): Tower {
        return new this.TowerType(position);
    }
}

export interface ITowerMetadata {
    price: number;
    name: string;
}
