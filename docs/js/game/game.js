import * as Time from "../util/time.js";
import { q } from "../util/dom.js";
import { LatencyCompensatedGameLoop } from "./loop.js";
export class Game {
    constructor() {
        this.gameRate = new Time.Rate(Time.MINUTE.ms, Time.MILLISECOND); // one game min per real ms
        this.div = q('div');
        this.gameSpan = Time.WEEK;
        this.realSpan = this.gameSpan.scaleTime(this.gameRate.inverse());
        this.t = new Time.Span(0);
        this.run = () => {
            this.loop.start();
        };
        this.simulate = () => {
            this.t.add(this.loop.rate.interval());
            this.gameSpan.subtract(this.loop.rate.interval().scaleTime(this.gameRate));
            this.realSpan.subtract(this.loop.rate.interval());
        };
        this.render = () => {
            if (this.div)
                this.div.innerHTML = this.realSpan.inSeconds() + "<br>" + this.gameSpan.inSeconds();
        };
        this.loop = new LatencyCompensatedGameLoop(this.simulate, this.render);
    }
}
//# sourceMappingURL=game.js.map