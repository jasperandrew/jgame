import { q } from "../util/dom.js";
import { Quantity, Rate } from "../util/physics/measurable.js";
import { MS, S, MIN, D, H } from "../util/physics/unit/definitions/time.js";
import { LatencyCompensatedGameLoop } from "./loop.js";
import { ONE_MYRON } from "../util/physics/constants.js";
const SPAN = ONE_MYRON.scale(1000);
export class Game {
    constructor() {
        this.gameRate = new Rate(MIN.n(1).n / MS.n(1).n); // one game min per real ms
        this.div = q('div');
        this.gameSpan = SPAN;
        this.realSpan = SPAN.scale(this.gameRate.inverse().n);
        this.t = new Quantity(0);
        this.run = () => {
            this.loop.start();
        };
        this.simulate = () => {
            // console.log(this.gameSpan);
            this.t = this.t.plus(this.loop.rate.interval());
            this.gameSpan = this.gameSpan.minus(this.loop.rate.interval().scale(this.gameRate.n));
            this.realSpan = this.realSpan.minus(this.loop.rate.interval());
        };
        this.render = () => {
            if (this.div)
                this.div.innerHTML = this.t.in(S) + '<br>' + this.realSpan.in(H) + '<br>' + this.gameSpan.in(S);
        };
        this.loop = new LatencyCompensatedGameLoop(this.simulate, this.render);
        console.log(this.realSpan.in(D));
    }
}
//# sourceMappingURL=game.js.map