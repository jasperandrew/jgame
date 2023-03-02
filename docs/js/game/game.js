import { q } from "../util/dom.js";
import { Quantity, Rate } from "../util/physics/measurable.js";
import { Time } from "../util/physics/unit/unit.js";
import { LatencyCompensatedGameLoop } from "./loop.js";
export class Game {
    constructor() {
        this.gameRate = new Rate(Time.MIN.n(1), Time.MS.n(1)); // one game min per real ms
        this.div = q('div');
        this.gameSpan = Time.W.n(1);
        this.realSpan = Time.W.n(1).scale(this.gameRate.inverse().n);
        this.t = new Quantity('time', 0);
        this.run = () => {
            this.loop.start();
        };
        this.simulate = () => {
            // console.log(this.gameSpan);
            this.t.add(this.loop.rate.interval());
            this.gameSpan.subtract(this.loop.rate.interval().scale(this.gameRate.n));
            this.realSpan.subtract(this.loop.rate.interval());
        };
        this.render = () => {
            if (this.div)
                this.div.innerHTML = this.t.in(Time.S) + '<br>' + this.realSpan.in(Time.S) + '<br>' + this.gameSpan.in(Time.S);
        };
        this.loop = new LatencyCompensatedGameLoop(this.simulate, this.render);
    }
}
//# sourceMappingURL=game.js.map