import { Quantity } from "./measurable.js";
export class UnitName {
    constructor(symbol, name, namePlural) {
        this.symbol = symbol;
        this.singular = name;
        this.plural = namePlural ? namePlural : name + 's';
    }
}
export class Unit {
    constructor(type, name, factor = 1, offset = 0) {
        var _a;
        this.n = (n) => { return new Quantity(this, n); };
        this.type = type;
        this.symbol = (_a = name === null || name === void 0 ? void 0 : name.symbol) !== null && _a !== void 0 ? _a : '';
        this.name = name !== null && name !== void 0 ? name : new UnitName('', '');
        this.factor = factor;
        this.offset = offset;
    }
}
Unit.base = (type) => {
    switch (type) {
        case 'time': return Time.S;
        case 'length': return Length.M;
        case 'temperature': return Temperature.K;
        default: return new Unit('none');
    }
};
export var Time;
(function (Time) {
    Time.MS = new Unit('time', new UnitName('ms', 'millisecond'), 1 / 1000);
    Time.S = new Unit('time', new UnitName('s', 'second'));
    Time.MIN = new Unit('time', new UnitName('min', 'minute'), 60);
    Time.HR = new Unit('time', new UnitName('h', 'hour'), Time.MIN.factor * 60);
    Time.D = new Unit('time', new UnitName('d', 'day'), Time.HR.factor * 24);
    Time.W = new Unit('time', new UnitName('w', 'week'), Time.D.factor * 7);
})(Time || (Time = {}));
export var Length;
(function (Length) {
    Length.MM = new Unit('length', new UnitName('mm', 'millimeter'), 1 / 1000);
    Length.CM = new Unit('length', new UnitName('cm', 'centimeter'), 1 / 100);
    Length.M = new Unit('length', new UnitName('m', 'meter'));
    Length.KM = new Unit('length', new UnitName('km', 'kilometer'), 1000);
    Length.INCH = new Unit('length', new UnitName('in', 'inch', 'inches'), 0.0254);
    Length.FOOT = new Unit('length', new UnitName('ft', 'foot', 'feet'), Length.INCH.factor * 12);
    Length.YARD = new Unit('length', new UnitName('yd', 'yard'), Length.FOOT.factor * 3);
    Length.MILE = new Unit('length', new UnitName('mi', 'mile'), Length.FOOT.factor * 5280);
})(Length || (Length = {}));
export var Temperature;
(function (Temperature) {
    Temperature.K = new Unit('temperature', new UnitName('K', 'kelvin'));
    Temperature.C = new Unit('temperature', new UnitName('°C', 'degree Celsius', 'degrees Celsius'), 1, 273.15);
    Temperature.F = new Unit('temperature', new UnitName('°F', 'degree Fahrenheit', 'degrees Fahrenheit'), 5 / 9, 459.67);
    Temperature.RA = new Unit('temperature', new UnitName('°Ra', 'degree Rankine', 'degrees Rankine'), 5 / 9);
})(Temperature || (Temperature = {}));
//# sourceMappingURL=unit.js.map