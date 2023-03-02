import { RateUnit, Unit } from "./unit/unit.js";
export class Quantity {
    constructor(n, unit) {
        this.in = (unit) => {
            return (this.n / unit.factor) - unit.offset;
        };
        this.print = (unit, words) => {
            return '';
        };
        this.add = (n) => {
            let x;
            if (n instanceof Quantity) {
                x = n.n;
            }
            else {
                x = n;
            }
            this.n += x;
            return this;
        };
        this.sub = (n) => {
            let x;
            if (n instanceof Quantity) {
                x = n.n;
            }
            else {
                x = n;
            }
            this.n = Math.max(0, this.n - x);
            return this;
        };
        this.scale = (factor) => {
            if (factor < 0)
                throw new NegativeQuantityError();
            this.n *= factor;
            return this;
        };
        if (unit) {
            this.n = (n * unit.factor) + unit.offset;
        }
        else {
            this.n = n;
        }
        if (this.n < 0)
            throw new NegativeQuantityError();
    }
}
export class Rate extends Quantity {
    constructor(n, unit) {
        super(n, new Unit());
        this.interval = (unit) => {
            var _a;
            let factor = (_a = unit === null || unit === void 0 ? void 0 : unit.factor) !== null && _a !== void 0 ? _a : 1;
            let adjustedN = this.in(new RateUnit({ factor: factor }));
            return new Quantity(1 / adjustedN);
        };
        this.inverse = () => {
            return new Rate(1 / this.n);
        };
    }
}
class QuantityError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class NegativeQuantityError extends QuantityError {
    constructor() {
        super(`the concept of negative quantity has not been implemented for this application.`);
    }
}
//# sourceMappingURL=measurable.js.map