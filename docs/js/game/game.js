import * as Time from "../util/time.js";
import * as Dom from "../util/dom.js";
import { LatencyCompensatedGameLoop } from "./loop.js";
export class Game {
    constructor() {
        this.frameRate = Time.SIXTY_PER_SECOND;
        this.gameRate = new Time.Rate(Time.MINUTE.milliseconds(), Time.MILLISECOND); // one game min per real ms
        this.div = Dom.q('div');
        this.gameSpan = Time.DAY;
        this.realSpan = this.gameSpan.scaleTime(this.gameRate.inverse());
        this.t = new Time.Span(0);
        this.simulate = () => {
            this.t.add(this.frameRate.interval());
            this.gameSpan.subtract(this.frameRate.interval().scaleTime(this.gameRate));
            this.realSpan.subtract(this.frameRate.interval());
        };
        this.render = () => {
            if (this.div)
                this.div.innerHTML = this.realSpan.seconds() + "<br>" + this.gameSpan.seconds();
        };
        this.loop = new LatencyCompensatedGameLoop(this.frameRate, this.simulate, this.render);
        this.loop.start();
    }
}
;
//# sourceMappingURL=game.js.map