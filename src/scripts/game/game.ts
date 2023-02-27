import * as Time from "../util/time.js"
import { q } from "../util/dom.js";
import { LatencyCompensatedGameLoop } from "./loop.js";

export class Game {

    gameRate: Time.Rate = new Time.Rate(Time.MINUTE.ms, Time.MILLISECOND); // one game min per real ms
    loop: LatencyCompensatedGameLoop;

    div = q('div');
    gameSpan = Time.WEEK;
    realSpan = this.gameSpan.scaleTime(this.gameRate.inverse());
    t = new Time.Span(0);

    constructor() {
        this.loop = new LatencyCompensatedGameLoop(this.simulate, this.render);
    }

    run = () => {
        this.loop.start();
    }

    simulate = () => {
        this.t.add(this.loop.rate.interval());
        this.gameSpan.subtract(this.loop.rate.interval().scaleTime(this.gameRate));
        this.realSpan.subtract(this.loop.rate.interval());
    }

    render = () => {
        if (this.div) this.div.innerHTML = this.realSpan.seconds + "<br>" + this.gameSpan.seconds;
    }
}