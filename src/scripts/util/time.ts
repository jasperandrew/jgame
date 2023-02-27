export class Span {
    private ms;

    constructor(ms: number) {
        this.ms = ms;
    }

    value(): number { return this.ms; }

    add(ms: Span) { this.ms += ms.value(); }
    subtract(ms: Span) { this.ms = Math.max(0, this.ms - ms.value()); }

    milliseconds() { return this.ms; }
    seconds() { return this.ms / 1000; }
    minutes() { return this.seconds() / 60; }
    hours() { return this.minutes() / 60; }
    days() { return this.hours() / 24; }
    weeks() { return this.days() / 7; }

    scaleTime(rate: Rate) {
        return new Span(this.ms * rate.perMillisecond());
    }
}

export const MILLISECOND = new Span(1);
export const SECOND = new Span(1000);
export const MINUTE = new Span(SECOND.value() * 60);
export const HOUR = new Span(MINUTE.value() * 60);
export const DAY = new Span(HOUR.value() * 24);
export const WEEK = new Span(DAY.value() * 7);
export const MYRON = new Span(HOUR.value() * 10000);
export const HEMYRON = new Span(MYRON.value() / 2);

export class Rate {
    private n;
    private span;

    constructor(n: number, span: Span) {
        this.n = n;
        this.span = span;
    }

    value(): number { return this.perMillisecond(); }
    inverse(): Rate { return new Rate(this.span.value(), new Span(this.n)); }
    interval(): Span { return new Span(this.span.value() / this.n); }

    perMillisecond() { return this.n / this.span.milliseconds(); }
    perSecond() { return this.perMillisecond() * 1000; }
    perMinute() { return this.perSecond() * 60; }
    perHour() { return this.perMinute() * 60; }
    perDay() { return this.perHour() * 24; }
    perWeek() { return this.perDay() * 7; }
}

export const ONE_PER_SECOND = new Rate(1, SECOND);
export const THIRTY_PER_SECOND = new Rate(30, SECOND);
export const SIXTY_PER_SECOND = new Rate(60, SECOND);