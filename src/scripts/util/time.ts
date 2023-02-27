export class Span {

    ms: number;

    constructor(milliseconds: number | Span, multiplier: number = 1) {
        if (typeof milliseconds === "object") {
            this.ms = milliseconds.ms * multiplier;
        } else {
            this.ms = milliseconds * multiplier;
        }
        if (this.ms < 0) throw "TimeError: the concept of negative time has not been implemented for this application.";
    }

    add(span: Span) { this.ms += span.ms; }
    subtract(span: Span) { this.ms = Math.max(0, this.ms - span.ms); }

    get seconds() { return this.ms / 1000; }
    get minutes() { return this.seconds / 60; }
    get hours() { return this.minutes / 60; }
    get days() { return this.hours / 24; }
    get weeks() { return this.days / 7; }

    scaleTime(rate: Rate) { return new Span(this.ms * rate.perMs); }


}

export const MILLISECOND = new Span(1);
export const SECOND = new Span(1000);
export const MINUTE = new Span(SECOND, 60);
export const HOUR = new Span(MINUTE, 60);
export const DAY = new Span(HOUR, 24);
export const WEEK = new Span(DAY, 7);
export const MYRON = new Span(HOUR, 10000);
export const HEMYRON = new Span(MYRON, 0.5);

export class Rate {
    
    n: number;
    span: Span;

    constructor(n: number, span: Span) {
        this.n = n;
        this.span = span;
    }

    inverse(): Rate { return new Rate(this.span.ms, new Span(this.n)); }
    interval(): Span { return new Span(this.span.ms / this.n); }

    get perMs() { return this.n / this.span.ms; }
    get perSecond() { return this.perMs * 1000; }
    get perMinute() { return this.perSecond * 60; }
    get perHour() { return this.perMinute * 60; }
    get perDay() { return this.perHour * 24; }
    get perWeek() { return this.perDay * 7; }
}

export const ONE_PER_SECOND = new Rate(1, SECOND);
export const THIRTY_PER_SECOND = new Rate(30, SECOND);
export const SIXTY_PER_SECOND = new Rate(60, SECOND);