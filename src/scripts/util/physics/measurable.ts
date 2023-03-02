import { RatioUnit, Unit } from "./unit/unit.js";

export class Measure<T> {

    n: number;

    constructor(n: number, unit?: Unit<T>) {
        if (unit) {
            this.n = (n * unit.factor) + unit.offset;
        } else {
            this.n = n;
        }
        if (this.n < 0) throw new NegativeQuantityError();
    }

    in = (unit: Unit<T>) => {
        return (this.n / unit.factor) - unit.offset;
    }

    print = (unit: Unit<T>, precision: number = 4, words: boolean = false) => {
        let num = this.in(unit);
        let name = words ? (num === 1 ? unit.singular : unit.plural) : unit.symbol;
        return num.toPrecision(precision) + ' ' + name;
    }

    plus = (n: Measure<T>) => {
        return new Measure<T>(this.n + n.n);
    }

    minus = (n: Measure<T>) => {
        return new Measure<T>(Math.max(0, this.n - n.n));
    }

    scale = (factor: number) => {
        return new Measure<T>(this.n * factor);
    }
}

export class Ratio<U,V> extends Measure<U & V>{

    constructor(n: number, unit?: RatioUnit<U,V>) {
        super(n, unit);
    }

    interval = (unit?: Unit<U>) => {
        let factor = unit?.factor ?? 1;
        let adjustedN = this.in(new RatioUnit<U,V>({ factor: factor }));
        return new Measure<V>(1 / adjustedN);
    }

    inverse = () => {
        return new Ratio<U,V>(1 / this.n);
    }
}

class NegativeQuantityError extends Error {
    constructor() {
        super('the concept of negative quantity has not been implemented for this application.');
        this.name = this.constructor.name;
    }
}