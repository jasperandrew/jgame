import { S } from "./units/time.js";
import { K } from "./units/temperature.js";
import { M } from "./units/length.js";
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
        this.type = type;
        this.symbol = (_a = name === null || name === void 0 ? void 0 : name.symbol) !== null && _a !== void 0 ? _a : '';
        this.name = name !== null && name !== void 0 ? name : new UnitName('', '');
        this.factor = factor;
        this.offset = offset;
    }
    static base(type) {
        switch (type) {
            case 'time': return S;
            case 'temperature': return K;
            case 'length': return M;
            default: return new Unit('none');
        }
    }
}
//# sourceMappingURL=units.js.map