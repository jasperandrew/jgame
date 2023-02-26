import * as Time from "./time.js";

const q = s => document.querySelector(s);
const qa = s => document.querySelectorAll(s);

let gameTime = Date.now();
let gameRate = new Time.Rate(Time.MINUTE, Time.MILLISECOND);
let frameRate = Time.SIXTY_PER_SECOND;
let latencyDelay = 0;

let div = q('div');

let gameSpan = Time.DAY;
let realSpan = gameSpan.realTime(gameRate);
let t = new Time.Span(0);

function simulate() {
    t.add(frameRate.interval());
    gameSpan.subtract(frameRate.interval().gameTime(gameRate));
    realSpan.subtract(frameRate.interval());
}

function render() {
    div.innerText = realSpan.seconds() + "\n" + gameSpan.seconds();
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