import { Rate } from "../util/physics/measurable.js";
import { Time } from "../util/physics/unit.js"; import MS = Time.MS;
import { THIRTY_HERTZ } from "../util/physics/constants.js";

export class LatencyCompensatedGameLoop {
    
    prevTime = 0;
    latencyDelay = 0;
    stopped = true;

    rate;
    logicFn;
    renderFn;

    constructor(logicFn: Function, renderFn: Function, rate: Rate = THIRTY_HERTZ) {
        this.rate = rate;
        this.logicFn = logicFn;
        this.renderFn = renderFn;
    }

    loop = () => {
        let now = Date.now();
        this.latencyDelay += (now - this.prevTime);
        this.prevTime = now;
    
        while (this.latencyDelay > 0) {
            this.logicFn();
            this.latencyDelay -= this.rate.interval().in(MS);
        }
    
        this.renderFn();

        if (!this.stopped)
            window.setTimeout(this.loop, this.rate.interval().in(MS));
    }

    start = () => {
        if (!this.stopped) return console.info('Game loop is already running.');
        this.stopped = false;
        this.prevTime = Date.now();
        this.latencyDelay = this.rate.interval().in(MS);
        this.loop();
    }

    stop = () => {
        this.stopped = true;
    }
}