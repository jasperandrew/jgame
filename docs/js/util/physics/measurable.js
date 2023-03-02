import { RateUnit } from "./unit/unit.js";
export class Quantity {
    constructor(n, unit) {
        this.in = (unit) => {
            return (this.n / unit.factor) - unit.offset;
        };
        this.print = (unit, words) => {
            return '';
        };
        this.plus = (n) => {
            return new Quantity(this.n + n.n);
        };
        this.minus = (n) => {
            return new Quantity(Math.max(0, this.n - n.n));
        };
        this.scale = (factor) => {
            return new Quantity(this.n * factor);
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
        super(n, unit);
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
class NegativeQuantityError extends Error {
    constructor() {
        super('the concept of negative quantity has not been implemented for this application.');
        this.name = this.constructor.name;
    }
}
//# sourceMappingURL=measurable.js.map