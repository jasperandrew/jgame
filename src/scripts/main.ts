import { Game } from "./game/game.js";

let game = new Game();
// game.loop.rate = new Time.Rate(2, Time.SECOND);
game.run();

(window as any).JGame = game;
