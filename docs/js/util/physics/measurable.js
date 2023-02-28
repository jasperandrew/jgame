import { Unit, UnitName } from "./unit.js";
import { removeNonLanguageCharacters as lang } from "../strings.js";
export class Quantity {
    constructor(unit, n = 1) {
        this.in = (unit) => {
            if (this.type !== unit.type && unit.type !== 'none')
                throw new InvalidUnitError(this.type, unit);
            return (this.n / unit.factor) - unit.offset;
        };
        this.print = (unit, words) => {
        };
        this.add = (n) => {
            let x;
            if (n instanceof Quantity) {
                if (this.type !== n.type && n.type !== 'none')
                    throw new InvalidQuantityOperationError(this.type, n.type);
                x = n.n;
            }
            else {
                x = n;
            }
            this.n += x;
            return this;
        };
        this.subtract = (n) => {
            let x;
            if (n instanceof Quantity) {
                if (this.type !== n.type && n.type !== 'none')
                    throw new InvalidQuantityOperationError(this.type, n.type);
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
                throw new NegativeQuantityError(this.constructor.name);
            this.n *= factor;
            return this;
        };
        let x = n instanceof Quantity ? n.n : n;
        if (unit instanceof Unit) {
            this.type = unit.type;
            this.n = (x * unit.factor) + unit.offset;
        }
        else {
            this.type = unit;
            this.n = x;
        }
        if (this.n < 0)
            throw new NegativeQuantityError(this.constructor.name);
    }
}
export class Rate extends Quantity {
    constructor(a, b, n = 1) {
        let aType = a instanceof Quantity ? a.type : a;
        let bType = b instanceof Quantity ? b.type : b;
        let x = a instanceof Quantity && b instanceof Quantity ? a.n / b.n : n;
        super(`${lang(aType)}/${lang(bType)}`, x);
        this.interval = (unit) => {
            return new Quantity(this.bType, 1 / this.in(Rate.Unit(unit !== null && unit !== void 0 ? unit : new Unit('none'), Unit.base(this.bType))));
        };
        this.inverse = () => {
            return new Rate(this.bType, this.aType, 1 / this.n);
        };
    }
    get aType() { return this.type.split('/')[0]; }
    get bType() { return this.type.split('/')[1]; }
}
Rate.Unit = (a, b) => {
    return new Unit(`${lang(a.type)}/${lang(b.type)}`, new UnitName(`${a.symbol}/${b.symbol}`, `${a.name.singular}/${b.name.singular}`, `${a.name.plural}/${b.name.singular}`), a.factor / b.factor
    // todo: offset math?
    );
};
// export class Rate {
//     n: number;
//     timespan: Timespan;
//     constructor(n: number, span: Timespan) {
//         this.n = n;
//         this.timespan = span;
//     }
//     perMs() { return this.n / this.timespan.n; }
//     perSecond() { return this.perMs() * 1000; }
//     perMinute() { return this.perSecond() * 60; }
//     perHour() { return this.perMinute() * 60; }
//     perDay() { return this.perHour() * 24; }
//     perWeek() { return this.perDay() * 7; }
//     perSpan(timespan: Timespan) { return this.perMs() * timespan.n; }
//     inverse(): Rate { return new Rate(this.timespan.n, new Timespan(this.n)); }
//     interval(): Timespan { return new Timespan(this.timespan.n / this.n); }
// }
class QuantityError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
class NegativeQuantityError extends QuantityError {
    constructor(name) {
        super(`the concept of negative ${name.toLowerCase()} has not been implemented for this application.`);
    }
}
class InvalidQuantityOperationError extends QuantityError {
    constructor(type1, type2) {
        super(`cannot perform counting/conversion operations with quantities of different types (${type1}, ${type2})`);
    }
}
class InvalidUnitError extends QuantityError {
    constructor(type, unit) {
        super(`cannot express a ${type} in ${unit.name.plural}`);
    }
}
//# sourceMappingURL=measurable.js.map