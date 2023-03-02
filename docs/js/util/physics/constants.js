import { Quantity, Rate } from "./measurable.js";
import * as Time from "./unit/definitions/time.js";
// /* Timespans */
export const ONE_MILLISECOND = new Quantity(1, Time.MS);
export const ONE_SECOND = new Quantity(1, Time.S);
export const ONE_MINUTE = new Quantity(1, Time.MIN);
export const ONE_HOUR = new Quantity(1, Time.H);
export const ONE_DAY = new Quantity(1, Time.D);
export const ONE_WEEK = new Quantity(1, Time.W);
export const ONE_MYRON = new Quantity(10000, Time.H);
export const ONE_HEMYRON = new Quantity(ONE_MYRON.n / 2);
// /* Rates */
export const ONE_HERTZ = new Rate(1, Time.HZ);
export const THIRTY_HERTZ = new Rate(30, Time.HZ);
export const SIXTY_HERTZ = new Rate(60, Time.HZ);
//# sourceMappingURL=constants.js.map