import { Unit } from "../unit.js";
export const K = new Unit({ symbol: 'K', factor: 1, singular: 'kelvin' });
export const C = new Unit({ symbol: '°C', factor: 1, offset: 273.15, singular: 'degree Celsius', plural: 'degrees Celsius' });
export const F = new Unit({ symbol: '°F', factor: 5 / 9, offset: 459.67, singular: 'degree Fahrenheit', plural: 'degrees Fahrenheit' });
export const RA = new Unit({ symbol: '°Ra', factor: 5 / 9, singular: 'degree Rankine', plural: 'degrees Rankine' });
//# sourceMappingURL=temperature.js.map