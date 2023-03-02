import { RatioUnit } from "./unit/unit.js";
export class Measure {
    constructor(n, unit) {
        this.in = (unit) => {
            return (this.n / unit.factor) - unit.offset;
        };
        this.print = (unit, precision = 4, words = false) => {
            let num = this.in(unit);
            let name = words ? (num === 1 ? unit.singular : unit.plural) : unit.symbol;
            return num.toPrecision(precision) + ' ' + name;
        };
        this.plus = (n) => {
            return new Measure(this.n + n.n);
        };
        this.minus = (n) => {
            return new Measure(Math.max(0, this.n - n.n));
        };
        this.scale = (factor) => {
            return new Measure(this.n * factor);
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
export class Ratio extends Measure {
    constructor(n, unit) {
        super(n, unit);
        this.interval = (unit) => {
            var _a;
            let factor = (_a = unit === null || unit === void 0 ? void 0 : unit.factor) !== null && _a !== void 0 ? _a : 1;
            let adjustedN = this.in(new RatioUnit({ factor: factor }));
            return new Measure(1 / adjustedN);
        };
        this.inverse = () => {
            return new Ratio(1 / this.n);
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