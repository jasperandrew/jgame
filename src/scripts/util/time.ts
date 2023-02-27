export class Span {

    ms: number;

    constructor(milliseconds: number | Span, multiplier: number = 1) {
        if (typeof milliseconds === "number") {
            this.ms = milliseconds * multiplier;
        } else {
            this.ms = milliseconds.ms * multiplier;
        }
        if (this.ms < 0) throw "TimeError: the concept of negative time has not been implemented for this application.";
    }

    inSeconds() { return this.ms / 1000; }
    inMinutes() { return this.inSeconds() / 60; }
    inHours() { return this.inMinutes() / 60; }
    inDays() { return this.inHours() / 24; }
    inWeeks() { return this.inDays() / 7; }

    add(span: Span) { this.ms += span.ms; }
    subtract(span: Span) { this.ms = Math.max(0, this.ms - span.ms); }

    scaleTime(rate: Rate) { return new Span(this.ms * rate.perMs()); }
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

    perMs() { return this.n / this.span.ms; }
    perSecond() { return this.perMs() * 1000; }
    perMinute() { return this.perSecond() * 60; }
    perHour() { return this.perMinute() * 60; }
    perDay() { return this.perHour() * 24; }
    perWeek() { return this.perDay() * 7; }

    inverse(): Rate { return new Rate(this.span.ms, new Span(this.n)); }
    interval(): Span { return new Span(this.span.ms / this.n); }
}

export const ONE_PER_SECOND = new Rate(1, SECOND);
export const THIRTY_PER_SECOND = new Rate(30, SECOND);
export const SIXTY_PER_SECOND = new Rate(60, SECOND);