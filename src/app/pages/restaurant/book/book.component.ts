import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingService } from 'src/app/services/booking service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
    @Input()
    restaurantId: number;

    participantsCount = 2;
    date: Date = new Date();
    interval: number[] = [100, 350];
    formattedInterval: BehaviorSubject<string[]>;
    unavailableFrames: number[][] = [];

    get intervalStart(): string {
        return this.formattedInterval.value[0];
    }
    set intervalStart(value: string) {
        const interval = this.formattedInterval.value;
        interval[0] = value;
        this.formattedInterval.next(interval);
    }

    get intervalEnd(): string {
        return this.formattedInterval.value[1];
    }
    set intervalEnd(value: string) {
        const interval = this.formattedInterval.value;
        interval[1] = value;
        this.formattedInterval.next(interval);
    }

    constructor(private bookingService: BookingService) {
        this.formattedInterval = new BehaviorSubject<string[]>(this.getFormattedInterval());
        this.formattedInterval.subscribe(value => {
            this.interval = [
                this.timeStringToMinutes(value[0]),
                this.timeStringToMinutes(value[1])
            ];
        });
    }

    ngOnInit(): void { }

    incrementParticipants(): void {
        this.participantsCount ++;
        this.updateAvailability();
    }

    decrementParticipants(): void {
        this.participantsCount --;
        this.updateAvailability();
    }

    onSlideMove(event: any) {
        this.interval = event.value;
        this.formattedInterval.next(this.getFormattedInterval());
    }

    formatLabel(value: number | null) {
        let minutesCount = value;

        if (!value) {
            minutesCount = 0;
        }
        const hours = Math.floor(minutesCount / 60);
        const minutes = minutesCount - (hours * 60);

        let hoursString: string = hours.toString();
        if (hours < 10) { hoursString = '0' + hoursString; }

        let minutesString: string = minutes.toString();
        if (minutes < 10) { minutesString = '0' + minutesString; }

        return hoursString + ':' + minutesString;
    }

    getFormattedInterval(): string[] {
        return [
            this.formatLabel(this.interval[0]),
            this.formatLabel(this.interval[1])
        ];
    }

    private timeStringToMinutes(time: string) {
        const hoursMinutes = time.split(/[.:]/);
        const hours = parseInt(hoursMinutes[0], 10);
        const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return minutes + hours * 60;
    }

    dateFilter(date: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (date < today) { return false; }

        return true;
    }

    updateAvailability(): void {
        this.bookingService.getUnavailableFramesByDay(this.restaurantId, this.participantsCount, this.date)
            .subscribe(unavailableFrames => {
                // console.log(unavailableFrames);
                this.unavailableFrames = unavailableFrames.map(unavailableFrame => [
                    this.timeToMinutes(unavailableFrame.start),
                    this.timeToMinutes(unavailableFrame.end)]);
            });
    }

    private timeToMinutes(date: Date): number {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return hours * 60 + minutes;
    }

    private dateFrameToMinutesFrame
}
