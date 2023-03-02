import { Measure, Ratio } from "./measurable.js";
import * as Time from "./unit/definitions/time.js";
// /* Timespans */
export const ONE_MILLISECOND = new Measure(1, Time.MS);
export const ONE_SECOND = new Measure(1, Time.S);
export const ONE_MINUTE = new Measure(1, Time.MIN);
export const ONE_HOUR = new Measure(1, Time.H);
export const ONE_DAY = new Measure(1, Time.D);
export const ONE_WEEK = new Measure(1, Time.W);
export const ONE_MYRON = new Measure(10000, Time.H);
export const ONE_HEMYRON = new Measure(ONE_MYRON.n / 2);
// /* Rates */
export const ONE_HERTZ = new Ratio(1, Time.HZ);
export const THIRTY_HERTZ = new Ratio(30, Time.HZ);
export const SIXTY_HERTZ = new Ratio(60, Time.HZ);
//# sourceMappingURL=constants.js.map