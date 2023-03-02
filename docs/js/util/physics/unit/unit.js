import { Quantity, Rate } from "../measurable.js";
export class Unit {
    constructor(description) {
        var _a, _b, _c, _d;
        this.n = (n) => { return new Quantity(n, this); };
        this.symbol = (_a = description === null || description === void 0 ? void 0 : description.symbol) !== null && _a !== void 0 ? _a : '<NO_SYMBOL>';
        this.factor = (_b = description === null || description === void 0 ? void 0 : description.factor) !== null && _b !== void 0 ? _b : 1;
        this.offset = (_c = description === null || description === void 0 ? void 0 : description.offset) !== null && _c !== void 0 ? _c : 0;
        this.singular = (_d = description === null || description === void 0 ? void 0 : description.singular) !== null && _d !== void 0 ? _d : '<NO_NAME>';
        this.plural = '<NO_PLURAL>';
        if (description === null || description === void 0 ? void 0 : description.singular)
            this.plural = (description === null || description === void 0 ? void 0 : description.singular) + 's';
        if (description === null || description === void 0 ? void 0 : description.plural)
            this.plural = description.plural;
    }
}
export class RateUnit extends Unit {
    constructor(description) {
        var _a;
        let factor = (_a = description === null || description === void 0 ? void 0 : description.factor) !== null && _a !== void 0 ? _a : 1;
        if ((description === null || description === void 0 ? void 0 : description.unit1) && (description === null || description === void 0 ? void 0 : description.unit2))
            factor = description.unit1.factor / description.unit2.factor;
        super({
            symbol: description === null || description === void 0 ? void 0 : description.symbol,
            singular: description === null || description === void 0 ? void 0 : description.singular,
            plural: description === null || description === void 0 ? void 0 : description.plural,
            factor: factor,
            offset: 0 // todo: figure out offset math
        });
        this.n = (n) => { return new Rate(n, this); };
    }
}
export const NoUnit = new Unit();
//# sourceMappingURL=unit.js.map