import { volume } from "../types.js";
import { Unit } from "../unit.js";

export const M3 = new Unit<volume>({ symbol: 'm³', factor: 1, singular: 'meter cubed', plural: 'meters cubed' });