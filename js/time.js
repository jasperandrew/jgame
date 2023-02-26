export class Span {
    constructor(ms) {
        this.ms = ms;
    }

    valueOf() { return this.ms; }
    toString() { return this.valueOf().toString(); }

    milliseconds() { return this.ms; }
    seconds() { return this.ms / 1000; }
    minutes() { return this.seconds() / 60; }
    hours() { return this.minutes() / 60; }
    days() { return this.hours() / 24; }
    weeks() { return this.days() / 7; }

    realTime(realRate) { // game ms per real ms
        return new Span(this.ms / realRate);
    }
}

export const SECOND = new Span(1000);
export const MINUTE = new Span(SECOND * 60);
export const HOUR = new Span(MINUTE * 60);
export const DAY = new Span(HOUR * 24);
export const WEEK = new Span(DAY * 7);
export const MYRON = new Span(HOUR * 10000);
export const HEMYRON = new Span(MYRON / 2);

export class Rate {
    constructor(ms, n=1) {
        this.ms = ms;
        this.n = n;
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

export const ONE_PER_SECOND = new Rate(SECOND);
export const THIRTY_PER_SECOND = new Rate(SECOND, 30);
export const SIXTY_PER_SECOND = new Rate(SECOND, 60);