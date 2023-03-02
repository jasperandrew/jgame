import { RateUnit, Unit } from "./unit/unit.js";

export class Quantity<T> {

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

    print = (unit: Unit<T>, words?: boolean) => {
        return '';
    }

    plus = (n: Quantity<T>) => {
        return new Quantity<T>(this.n + n.n);
    }

    minus = (n: Quantity<T>) => {
        return new Quantity<T>(Math.max(0, this.n - n.n));
    }

    scale = (factor: number) => {
        return new Quantity<T>(this.n * factor);
    }
}

export class Rate<U,V> extends Quantity<U & V>{

    constructor(n: number, unit?: RateUnit<U,V>) {
        super(n, unit);
    }

    interval = (unit?: Unit<U>) => {
        let factor = unit?.factor ?? 1;
        let adjustedN = this.in(new RateUnit<U,V>({ factor: factor }));
        return new Quantity<V>(1 / adjustedN);
    }

    inverse = () => {
        return new Rate<U,V>(1 / this.n);
    }
}

class NegativeQuantityError extends Error {
    constructor() {
        super('the concept of negative quantity has not been implemented for this application.');
        this.name = this.constructor.name;
    }
}