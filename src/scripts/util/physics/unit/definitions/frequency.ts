import { RateUnit } from "../unit.js";
import { _, time } from "../types.js";

export const HZ = new RateUnit<_,time>({ symbol: 'Hz', singular: 'hertz', plural: 'hertz' });
