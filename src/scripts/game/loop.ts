import { Rate } from "../util/time.js";

export class LatencyCompensatedGameLoop {
    private prevTime = 0;
    private latencyDelay = 0;
    private stopped = false;

    private frameRate;
    private logicFn;
    private renderFn;

    constructor(frameRate: Rate, logicFn: Function, renderFn: Function) {
        this.frameRate = frameRate;
        this.logicFn = logicFn;
        this.renderFn = renderFn;
    }

    private loop = () => {
        let now = Date.now();
        this.latencyDelay += (now - this.prevTime);
        this.prevTime = now;
    
        while (this.latencyDelay > 0) {
            this.logicFn();
            this.latencyDelay -= this.frameRate.interval().milliseconds();
        }
    
        this.renderFn();

        if (!this.stopped)
            window.setTimeout(this.loop, this.frameRate.interval().milliseconds());
    }

    start = () => {
        this.stopped = false;
        this.prevTime = Date.now();
        this.latencyDelay = this.frameRate.interval().milliseconds();
        this.loop();
    }

    stop = () => {
        this.stopped = true;
    }
}