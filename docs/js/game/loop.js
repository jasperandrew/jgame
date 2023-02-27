export class LatencyCompensatedGameLoop {
    constructor(frameRate, logicFn, renderFn) {
        this.prevTime = 0;
        this.latencyDelay = 0;
        this.stopped = false;
        this.loop = () => {
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
        };
        this.start = () => {
            this.stopped = false;
            this.prevTime = Date.now();
            this.latencyDelay = this.frameRate.interval().milliseconds();
            this.loop();
        };
        this.stop = () => {
            this.stopped = true;
        };
        this.frameRate = frameRate;
        this.logicFn = logicFn;
        this.renderFn = renderFn;
    }
}
//# sourceMappingURL=loop.js.map