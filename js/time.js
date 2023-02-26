export class Span {
    constructor(ms) {
        this.ms = ms;
    }

    valueOf() { return this.ms; }
    toString() { return this.valueOf().toString(); }

    add(ms) { this.ms += ms; }
    subtract(ms) { this.ms = Math.max(0, this.ms - ms); }

    milliseconds() { return this.ms; }
    seconds() { return this.ms / 1000; }
    minutes() { return this.seconds() / 60; }
    hours() { return this.minutes() / 60; }
    days() { return this.hours() / 24; }
    weeks() { return this.days() / 7; }

    realTime(gameRate) {
        return new Span(this.ms / gameRate);
    }

    gameTime(gameRate) {
        return new Span(this.ms * gameRate);
    }
}

export const MILLISECOND = new Span(1);
export const SECOND = new Span(1000);
export const MINUTE = new Span(SECOND * 60);
export const HOUR = new Span(MINUTE * 60);
export const DAY = new Span(HOUR * 24);
export const WEEK = new Span(DAY * 7);
export const MYRON = new Span(HOUR * 10000);
export const HEMYRON = new Span(MYRON / 2);

export class Rate {
    constructor(n, ms) {
        this.n = n;
        this.ms = ms;
    }

    valueOf() { return this.perMillisecond(); }
    toString() { return this.valueOf().toString(); }
    interval() { return new Span(this.ms / this.n); }

    perMillisecond() { return this.n / this.ms; }
    perSecond() { return this.perMillisecond() * 1000; }
    perMinute() { return this.perSecond() * 60; }
    perHour() { return this.perMinute() * 60; }
    perDay() { return this.perHour() * 24; }
    perWeek() { return this.perDay() * 7; }
}

export const ONE_PER_SECOND = new Rate(1, SECOND);
export const THIRTY_PER_SECOND = new Rate(30, SECOND);
export const SIXTY_PER_SECOND = new Rate(60, SECOND);