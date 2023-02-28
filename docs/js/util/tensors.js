import * as Measurable from "./physics/measurables.js";
/* Units */
/* Timespans */
export const MILLISECOND = new Measurable.Quantity(1);
export const SECOND = new Measurable.Timespan(1000);
export const MINUTE = new Measurable.Timespan(SECOND, 60);
export const HOUR = new Measurable.Timespan(MINUTE, 60);
export const DAY = new Measurable.Timespan(HOUR, 24);
export const WEEK = new Measurable.Timespan(DAY, 7);
export const MYRON = new Measurable.Timespan(HOUR, 10000);
export const HEMYRON = new Measurable.Timespan(MYRON, 0.5);
/* Rates */
export const ONE_PER_SECOND = new Measurable.Rate(1, SECOND);
export const THIRTY_PER_SECOND = new Measurable.Rate(30, SECOND);
export const SIXTY_PER_SECOND = new Measurable.Rate(60, SECOND);
//# sourceMappingURL=tensors.js.map