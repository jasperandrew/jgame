import { Quantity, Rate } from "../measurable.js";

interface UnitDescription {
    symbol?: string;
    factor?: number;
    offset?: number;
    singular?: string;
    plural?: string;

    // just used for RateUnit
    unit1?: Unit<any>;
    unit2?: Unit<any>;
}

export class Unit<T> {

    symbol: string;
    factor: number;
    offset: number;
    singular: string;
    plural: string;

    constructor(description?: UnitDescription) {
        this.symbol = description?.symbol ?? '<NO_SYMBOL>';
        this.factor = description?.factor ?? 1;
        this.offset = description?.offset ?? 0;
        this.singular = description?.singular ?? '<NO_NAME>';
        this.plural = '<NO_PLURAL>';
        if(description?.singular) this.plural = description?.singular + 's';
        if(description?.plural) this.plural = description.plural;
    }

    n = (n: number): Quantity<T> => { return new Quantity(n, this); }
}

export class RateUnit<U,V> extends Unit<U & V> {
    constructor(description?: UnitDescription) {
        let factor = description?.factor ?? 1;
        if (description?.unit1 && description?.unit2)
            factor = description.unit1.factor / description.unit2.factor;
        super({
            symbol: description?.symbol,
            singular: description?.singular,
            plural: description?.plural,
            factor: factor,
            offset: 0 // todo: figure out offset math
        });
    }

    n = (n: number): Rate<U,V> => { return new Rate(n, this); }
}

export const NoUnit = new Unit<any>();
