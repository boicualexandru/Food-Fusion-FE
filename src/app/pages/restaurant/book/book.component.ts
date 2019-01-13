import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingService } from 'src/app/services/booking service';
import { DatePipe } from '@angular/common';
import { Timespan } from 'src/app/models/boilerplate/timespan';
import { ReservationRequest } from 'src/app/models/reservation/reservationRequest';
import { DateRange } from 'src/app/models/boilerplate/dateRange';

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
                this.formattedStringToMinutes(value[0]),
                this.formattedStringToMinutes(value[1])
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

    getFormattedInterval(): string[] {
        return [
            this.minutesToFormattedString(this.interval[0]),
            this.minutesToFormattedString(this.interval[1])
        ];
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
                this.unavailableFrames = unavailableFrames.map(unavailableFrame => [
                    this.dateToMinutes(unavailableFrame.start),
                    this.dateToMinutes(unavailableFrame.end)]);
            });
    }

    minutesToFormattedString(value: number | null) {
        const timeSpan = Timespan.fromMinutes(value || 0);
        return timeSpan.toString();
    }

    private dateToMinutes(date: Date): number {
        const timespan = Timespan.fromDate(date);
        return timespan.toMinutes();
    }

    private formattedStringToMinutes(time: string): number {
        const timespan = Timespan.fromFormattedString(time);
        return timespan.toMinutes();
    }

    book(): void {
        const timespanStart = Timespan.fromMinutes(this.interval[0]);
        const timespanEnd = Timespan.fromMinutes(this.interval[1]);

        const start = timespanStart.toDate(this.date);
        const end = timespanEnd.toDate(this.date);

        const dateRange: DateRange = {
            start: start,
            end: end
        };

        this.bookingService.addReservation(this.restaurantId, dateRange, this.participantsCount)
            .subscribe(reservation => console.log(reservation));
    }
}
