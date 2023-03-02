import { q } from "../util/dom.js";
import { Quantity, Rate } from "../util/physics/measurable.js";
import { _, time } from "../util/physics/unit/types.js";
import { MS, S, MIN, W, D, H } from "../util/physics/unit/definitions/time.js";
import { LatencyCompensatedGameLoop } from "./loop.js";
import { ONE_MYRON, ONE_WEEK } from "../util/physics/constants.js";

const SPAN = ONE_MYRON.scale(1000);

export class Game {

    gameRate: Rate<_,time> = new Rate<time,time>(MIN.n(1).n/MS.n(1).n); // one game min per real ms
    loop: LatencyCompensatedGameLoop;

    div = q('div');
    gameSpan = SPAN;
    realSpan = SPAN.scale(this.gameRate.inverse().n);
    t = new Quantity<time>(0);

    constructor() {
        this.loop = new LatencyCompensatedGameLoop(this.simulate, this.render);
        console.log(this.realSpan.in(D));
    }

    run = () => {
        this.loop.start();
    }

    simulate = () => {
        // console.log(this.gameSpan);
        this.t = this.t.plus(this.loop.rate.interval());
        this.gameSpan = this.gameSpan.minus(this.loop.rate.interval().scale(this.gameRate.n));
        this.realSpan = this.realSpan.minus(this.loop.rate.interval());
    }

    render = () => {
        if (this.div) this.div.innerHTML = this.t.in(S) + '<br>' + this.realSpan.in(H) + '<br>' + this.gameSpan.in(S);
    }
}