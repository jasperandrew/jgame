import { THIRTY_PER_SECOND } from "../util/time.js";
export class LatencyCompensatedGameLoop {
    constructor(logicFn, renderFn, rate = THIRTY_PER_SECOND) {
        this.prevTime = 0;
        this.latencyDelay = 0;
        this.stopped = true;
        this.loop = () => {
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
        };
        this.start = () => {
            if (!this.stopped)
                return console.info('Game loop is already running.');
            this.stopped = false;
            this.prevTime = Date.now();
            this.latencyDelay = this.rate.interval().ms;
            this.loop();
        };
        this.stop = () => {
            this.stopped = true;
        };
        this.rate = rate;
        this.logicFn = logicFn;
        this.renderFn = renderFn;
    }
}
//# sourceMappingURL=loop.js.map