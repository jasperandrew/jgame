export class Timespan {
    constructor(milliseconds, multiplier = 1) {
        if (typeof milliseconds === "number") {
            this.ms = milliseconds * multiplier;
        }
        else {
            this.ms = milliseconds.ms * multiplier;
        }
        if (this.ms < 0)
            throw "TimeError: the concept of negative time has not been implemented for this application.";
    }
    inSeconds() { return this.ms / 1000; }
    inMinutes() { return this.inSeconds() / 60; }
    inHours() { return this.inMinutes() / 60; }
    inDays() { return this.inHours() / 24; }
    inWeeks() { return this.inDays() / 7; }
    inSpans(timespan) { return this.ms / timespan.ms; }
    add(timespan) { this.ms += timespan.ms; }
    subtract(timespan) { this.ms = Math.max(0, this.ms - timespan.ms); }
    scaleTime(rate) { return new Timespan(this.ms * rate.perMs()); }
}
export class Rate {
    constructor(n, span) {
        this.n = n;
        this.timespan = span;
    }
    perMs() { return this.n / this.timespan.ms; }
    perSecond() { return this.perMs() * 1000; }
    perMinute() { return this.perSecond() * 60; }
    perHour() { return this.perMinute() * 60; }
    perDay() { return this.perHour() * 24; }
    perWeek() { return this.perDay() * 7; }
    perSpan(timespan) { return this.perMs() * timespan.ms; }
    inverse() { return new Rate(this.timespan.ms, new Timespan(this.n)); }
    interval() { return new Timespan(this.timespan.ms / this.n); }
}
//# sourceMappingURL=measurable.js.map