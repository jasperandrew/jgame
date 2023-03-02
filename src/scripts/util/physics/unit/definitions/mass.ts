import { mass } from "../types.js";
import { Unit } from "../unit.js";

export const KG = new Unit<mass>({ symbol: 'kg', factor: 1, singular: 'kilogram' });
export const M_SOLAR = new Unit<mass>({ symbol: 'M☉', factor: 1.98847 * Math.pow(10, 30), singular: 'solar mass', plural: 'solar masses'});