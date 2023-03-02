// import { Game } from "./game/game.js";
import * as Measurable from "./util/physics/measurable.js";
import * as Constant from "./util/physics/constants.js";
import * as Unit from "./util/physics/unit/unit.js";

// let game = new Game();
// // game.loop.rate = new Time.Rate(2, Time.SECOND);
// game.run();

// (window as any).JGame = game;
(window as any).M = Measurable;
(window as any).C = Constant;
(window as any).U = Unit;
