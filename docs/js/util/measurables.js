export class UnitConversion {
    constructor(factor, offset = 0) {
        this.factor = factor;
        this.offset = offset;
    }
}
export class Unit {
    constructor(type, conversion, name, namePlural, symbol) {
        this.type = type;
        this.conversion = conversion;
        this.name = name;
        this.namePlural = namePlural;
        this.symbol = symbol;
    }
}
export class Quantity {
    constructor(unit, quantity, multiplier = 1) {
        this.unit = unit;
        if (typeof quantity === 'number')
            this.n = quantity * multiplier;
        else
            this.n = quantity.n * multiplier;
        if (this.n < 0)
            throw new NegativeQuantityError(this.constructor.name);
    }
    add(quantity) {
        if (typeof quantity === 'number') {
            this.n += quantity;
            return;
        }
        if (this.unit.type !== quantity.unit.type)
            throw new InvalidQuantityOperationError(this.unit.type, quantity.unit.type);
        this.n += quantity.n;
    }
    subtract(quantity) {
        if (typeof quantity === 'number') {
            this.n = Math.max(0, this.n - quantity);
            return;
        }
        if (this.unit.type !== quantity.unit.type)
            throw new InvalidQuantityOperationError(this.unit.type, quantity.unit.type);
        this.n = Math.max(0, this.n - quantity.n);
    }
    scale(factor) {
        if (factor < 0)
            throw new NegativeQuantityError(this.constructor.name);
        this.n *= factor;
    }
}
export class Rate {
    constructor(n, span) {
        this.n = n;
        this.timespan = span;
    }
    perMs() { return this.n / this.timespan.n; }
    perSecond() { return this.perMs() * 1000; }
    perMinute() { return this.perSecond() * 60; }
    perHour() { return this.perMinute() * 60; }
    perDay() { return this.perHour() * 24; }
    perWeek() { return this.perDay() * 7; }
    perSpan(timespan) { return this.perMs() * timespan.n; }
    inverse() { return new Rate(this.timespan.n, new Timespan(this.n)); }
    interval() { return new Timespan(this.timespan.n / this.n); }
}
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
//# sourceMappingURL=measurables.js.map