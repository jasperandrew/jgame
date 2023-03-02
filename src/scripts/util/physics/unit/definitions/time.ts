import { Unit } from "../unit.js";
import { time } from "../types.js";

export const MS =  new Unit<time>({ symbol: 'ms', factor: 1/1000,          singular: 'millisecond' });
export const S =   new Unit<time>({ symbol: 's',  factor: 1,               singular: 'second'});
export const MIN = new Unit<time>({ symbol: 'm',  factor: 60,              singular: 'minute' });
export const H =   new Unit<time>({ symbol: 'h',  factor: MIN.factor * 60, singular: 'hour' });
export const D =   new Unit<time>({ symbol: 'd',  factor: H.factor * 24,   singular: 'day' });
export const W =   new Unit<time>({ symbol: 'w',  factor: D.factor * 7,    singular: 'week' });
