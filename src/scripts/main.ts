import { Game } from "./game/game.js";
import * as Time from "./util/time.js"

let game = new Game();
// game.loop.rate = new Time.Rate(2, Time.SECOND);
game.run();

(window as any).JGame = game;
(window as any).Time = Time;

let t = new Time.Span(Time.HOUR, 2);
console.log(t.inHours());
