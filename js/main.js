import * as Time from "./time.js";

const q = s => document.querySelector(s);
const qa = s => document.querySelectorAll(s);

let gameTime = Date.now();
let gameRate = new Time.Rate(1, Time.MINUTE);
let frameRate = Time.SIXTY_PER_SECOND;
let latencyDelay = 0;

let div = q('div');
let realMyron = Time.MYRON.realTime(gameRate);
let t = new Time.Span(0);

function simulate() {
    t.ms += frameRate.interval();
    realMyron.ms -= frameRate.interval();
}

function render() {
    div.innerText = realMyron.seconds();
}

function loop() {
    let now = Date.now();
    latencyDelay += (now - gameTime);
    gameTime = now;

    while (latencyDelay > 0) {
        simulate();
        latencyDelay -= frameRate.interval();
    }

    render();
    window.setTimeout(loop, frameRate.interval());
}

loop();