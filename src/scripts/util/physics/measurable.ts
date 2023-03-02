import { RateUnit, Unit, NoUnit } from "./unit/unit.js";

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

    add = (n: Quantity<T> | number) => {
        let x;
        if (n instanceof Quantity) {
            x = n.n;
        } else {
            x = n as number;
        }

        this.n += x;
        return this;
    }

    sub = (n: Quantity<T> | number) => {
        let x;
        if (n instanceof Quantity) {
            x = n.n;
        } else {
            x = n as number;
        }

        this.n = Math.max(0, this.n - x);
        return this;
    }

    scale = (factor: number) => {
        if (factor < 0) throw new NegativeQuantityError();
        this.n *= factor;
        return this;
    }
}

export class Rate<U,V> extends Quantity<U & V>{

    constructor(n: number, unit?: RateUnit<U,V>) {
        super(n, new Unit<U & V>());
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

class QuantityError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

class NegativeQuantityError extends QuantityError {
    constructor() {
        super(`the concept of negative quantity has not been implemented for this application.`);
    }
}
