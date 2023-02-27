import * as Time from "../util/time.js"
import * as Dom from "../util/dom.js";
import { LatencyCompensatedGameLoop } from "./loop.js";

export class Game {
    frameRate: Time.Rate = Time.SIXTY_PER_SECOND;
    gameRate: Time.Rate = new Time.Rate(Time.MINUTE.milliseconds(), Time.MILLISECOND); // one game min per real ms
    loop: LatencyCompensatedGameLoop;

    div = Dom.q('div');
    gameSpan = Time.DAY;
    realSpan = this.gameSpan.scaleTime(this.gameRate.inverse());
    t = new Time.Span(0);

    constructor() {
        this.loop = new LatencyCompensatedGameLoop(this.frameRate, this.simulate, this.render);
        this.loop.start();
    }

    private simulate = () => {
        this.t.add(this.frameRate.interval());
        this.gameSpan.subtract(this.frameRate.interval().scaleTime(this.gameRate));
        this.realSpan.subtract(this.frameRate.interval());
    }

    private render = () => {
        if (this.div) this.div.innerHTML = this.realSpan.seconds() + "<br>" + this.gameSpan.seconds();
    }
};