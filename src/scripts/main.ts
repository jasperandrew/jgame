import { Game } from "./game/game.js";
import * as Measurable from "./util/physics/measurable.js";
import * as Constant from "./util/physics/constants.js";
import { Time } from "./util/physics/unit.js";

let game = new Game();
// game.loop.rate = new Time.Rate(2, Time.SECOND);
game.run();

// (window as any).JGame = game;
(window as any).M = Measurable;
(window as any).C = Constant;
(window as any).T = Time;

// let t = new Measurable.Timespan(Constant.HOUR, 2);
// console.log(t.inHours());