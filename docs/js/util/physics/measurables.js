import { Unit, UnitName } from "./unit.js";
import { removeNonLanguageCharacters as lang } from "../strings.js";
export class Quantity {
    constructor(unit, n = 1) {
        this.in = (unit) => {
            if (this.type !== unit.type)
                throw new InvalidUnitError(this.type, unit);
            return (this.n / unit.factor) - unit.offset;
        };
        this.add = (n) => {
            let x;
            if (typeof n === 'number') {
                x = n;
            }
            else {
                if (this.type !== n.type)
                    throw new InvalidQuantityOperationError(this.type, n.type);
                x = n.n;
            }
            this.n += x;
        };
        this.subtract = (n) => {
            let x;
            if (typeof n === 'number') {
                x = n;
            }
            else {
                if (this.type !== n.type)
                    throw new InvalidQuantityOperationError(this.type, n.type);
                x = n.n;
            }
            this.n = Math.max(0, this.n - x);
        };
        this.scale = (factor) => {
            if (factor < 0)
                throw new NegativeQuantityError(this.constructor.name);
            this.n *= factor;
        };
        let x = typeof n === 'number' ? n : n.n;
        if (typeof unit === 'string') {
            this.type = unit;
            this.n = x;
        }
        else {
            this.type = unit.type;
            this.n = (x * unit.factor) + unit.offset;
        }
        if (this.n < 0)
            throw new NegativeQuantityError(this.constructor.name);
    }
}
export class Rate extends Quantity {
    constructor(a, b, n = 1) {
        let aType = typeof a === 'string' ? a : a.type;
        let bType = typeof b === 'string' ? b : b.type;
        let x = typeof a === 'string' || typeof b === 'string' ? n : a.n / b.n;
        super(`${lang(aType)}/${lang(bType)}`, x);
        this.interval = (unit) => {
            return new Quantity(this.bType, 1 / this.in(Rate.Unit(unit, Unit.base(this.bType))));
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
//# sourceMappingURL=measurables.js.map