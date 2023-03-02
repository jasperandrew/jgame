import { Unit, RateUnit } from "../unit.js";
export const MS = new Unit({ symbol: 'ms', factor: 1 / 1000, singular: 'millisecond' });
export const S = new Unit({ symbol: 's', factor: 1, singular: 'second' });
export const MIN = new Unit({ symbol: 'm', factor: 60, singular: 'minute' });
export const H = new Unit({ symbol: 'h', factor: MIN.factor * 60, singular: 'hour' });
export const D = new Unit({ symbol: 'd', factor: H.factor * 24, singular: 'day' });
export const W = new Unit({ symbol: 'w', factor: D.factor * 7, singular: 'week' });
export const HZ = new RateUnit({ symbol: 'Hz', singular: 'hertz', plural: 'hertz' });
//# sourceMappingURL=time.js.map