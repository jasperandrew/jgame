import { Rate, THIRTY_PER_SECOND } from "../util/time.js";

export class LatencyCompensatedGameLoop {
    
    prevTime = 0;
    latencyDelay = 0;
    stopped = true;

    rate;
    logicFn;
    renderFn;

    constructor(logicFn: Function, renderFn: Function, rate: Rate = THIRTY_PER_SECOND) {
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
            this.latencyDelay -= this.rate.interval().ms;
        }
    
        this.renderFn();

        if (!this.stopped)
            window.setTimeout(this.loop, this.rate.interval().ms);
    }

    start = () => {
        if (!this.stopped) return console.info('Game loop is already running.');
        this.stopped = false;
        this.prevTime = Date.now();
        this.latencyDelay = this.rate.interval().ms;
        this.loop();
    }

    stop = () => {
        this.stopped = true;
    }
}