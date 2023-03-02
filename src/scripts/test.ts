import { Quantity, Rate } from "./util/physics/measurable.js";
import * as Constant from "./util/physics/constants.js";
import * as Unit from "./util/physics/unit/unit.js";
import * as Time from "./util/physics/unit/definitions/time.js";

(window as any).M = { Quantity: Quantity, Rate: Rate };
(window as any).C = Constant;
(window as any).U = Unit;
(window as any).T = Time;

function test<T>(display: string, input: T, expected: T) {
    if (input === expected){
        console.log(`PASSED: ${display} >> (${expected})`);
    } else {
        console.warn(`${display}:`);
        console.warn('   expected: ', expected);
        console.warn('   received: ', input);
    }
}

test('Constant.ONE_HEMYRON.in(Time.H)', Constant.ONE_HEMYRON.in(Time.H), 5000);
test('Constant.THIRTY_HERTZ.in(Time.HZ)', Constant.THIRTY_HERTZ.in(Time.HZ), 30);
test('new Quantity(31, Time.HZ).sub(1).n', new Quantity(31, Time.HZ).minus(Constant.ONE_HERTZ).n, Constant.THIRTY_HERTZ.n);
test('Constant.THIRTY_HERTZ.interval().in(Time.MS)', Constant.THIRTY_HERTZ.interval().in(Time.MS), 1000/30);
