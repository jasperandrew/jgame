import { Unit } from "../unit.js";
export const MM = new Unit({ symbol: 'mm', factor: 1 / 1000, singular: 'millimeter' });
export const CM = new Unit({ symbol: 'cm', factor: 1 / 100, singular: 'centimeter' });
export const M = new Unit({ symbol: 'm', factor: 1, singular: 'meter' });
export const KM = new Unit({ symbol: 'km', factor: 1000, singular: 'kilometer' });
export const INCH = new Unit({ symbol: 'in', factor: 0.0254, singular: 'inch', plural: 'inches' });
export const FOOT = new Unit({ symbol: 'ft', factor: INCH.factor * 12, singular: 'foot', plural: 'feet' });
export const YARD = new Unit({ symbol: 'yd', factor: FOOT.factor * 3, singular: 'yard' });
export const MILE = new Unit({ symbol: 'mi', factor: FOOT.factor * 5280, singular: 'mile' });
//# sourceMappingURL=length.js.map