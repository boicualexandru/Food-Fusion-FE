export class Timespan {
    public readonly hours: number;
    public readonly minutes: number;

    constructor(hours: number = 0, minutes: number = 0) {
        this.hours = hours + Math.floor(minutes / 60);
        this.minutes = minutes % 60;
    }

    static fromMinutes(minutes: number): Timespan {
        return new Timespan(0, minutes);
    }

    static fromHours(hours: number): Timespan {
        return new Timespan(hours);
    }

    public toString(): string {
        let hoursString: string = this.hours.toString();
        if (this.hours < 10) { hoursString = '0' + hoursString; }

        let minutesString: string = this.minutes.toString();
        if (this.minutes < 10) { minutesString = '0' + minutesString; }

        return hoursString + ':' + minutesString;
    }
}
