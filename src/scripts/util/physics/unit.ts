import { Quantity } from "./measurable.js";

export class UnitName {

    symbol: string;
    singular: string;
    plural: string;

    constructor(symbol: string, name: string, namePlural?: string) {
        this.symbol = symbol;
        this.singular = name;
        this.plural = namePlural ? namePlural : name + 's';
    }
}

export class Unit {

    type: string;
    symbol: string;
    name: UnitName;
    factor: number;
    offset: number;

    constructor(type: string, name?: UnitName, factor: number = 1, offset: number = 0) {
        this.type = type;
        this.symbol = name?.symbol ?? '';
        this.name = name ?? new UnitName('','');
        this.factor = factor;
        this.offset = offset;
    }

    static base = (type: string): Unit => {
        switch(type) {
            case 'time': return Time.S;
            case 'length': return Length.M;
            case 'temperature': return Temperature.K;
            default: return new Unit('none');
        }
    }

    n = (n: number) => { return new Quantity(this, n); }
}

export namespace Time {
    export const MS = new Unit('time', new UnitName('ms', 'millisecond'), 1/1000);
    export const S = new Unit('time', new UnitName('s', 'second'));
    export const MIN = new Unit('time', new UnitName('min', 'minute'), 60);
    export const HR = new Unit('time', new UnitName('h', 'hour'), MIN.factor * 60);
    export const D = new Unit('time', new UnitName('d', 'day'), HR.factor * 24);
    export const W = new Unit('time', new UnitName('w', 'week'), D.factor * 7);
}

export namespace Length {
    export const MM = new Unit('length', new UnitName('mm', 'millimeter'), 1/1000);
    export const CM = new Unit('length', new UnitName('cm', 'centimeter'), 1/100);
    export const M = new Unit('length', new UnitName('m', 'meter'));
    export const KM = new Unit('length', new UnitName('km', 'kilometer'), 1000);
    export const INCH = new Unit('length', new UnitName('in', 'inch', 'inches'), 0.0254);
    export const FOOT = new Unit('length', new UnitName('ft', 'foot', 'feet'), INCH.factor * 12);
    export const YARD = new Unit('length', new UnitName('yd', 'yard'), FOOT.factor * 3);
    export const MILE = new Unit('length', new UnitName('mi', 'mile'), FOOT.factor * 5280);
}

export namespace Temperature {
    export const K = new Unit('temperature', new UnitName('K', 'kelvin'));
    export const C = new Unit('temperature', new UnitName('°C', 'degree Celsius', 'degrees Celsius'), 1, 273.15);
    export const F = new Unit('temperature', new UnitName('°F', 'degree Fahrenheit', 'degrees Fahrenheit'), 5/9, 459.67);
    export const RA = new Unit('temperature', new UnitName('°Ra', 'degree Rankine', 'degrees Rankine'), 5/9);
}