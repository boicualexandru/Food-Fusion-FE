import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingService } from 'src/app/services/booking service';
import { Timespan } from 'src/app/models/boilerplate/timespan';
import { Router } from '@angular/router';
import { ReservationRequest } from 'src/app/models/reservation/reservationRequest';
import { MatDialog } from '@angular/material';
import { ChoosetableDialogComponent } from './choose-table-dialog/choose-table-dialog.component';
import { Table } from 'src/app/models/restaurant/table';

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
    interval: number[] = [1170, 1320];
    formattedInterval: BehaviorSubject<string[]>;
    unavailableFrames: number[][] = [];

    selectedTables: Table[] = [];

    minutesPerDay = 1440;
    minutesBetween = 30;
    minutesOfReservation = 60;
    fromAllMinutes: number[] = Array.from(Array(this.minutesPerDay / this.minutesBetween).keys()).map(x => x * this.minutesBetween);
    fromAvailableFrames: number[] = [];

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

    constructor(private bookingService: BookingService, private router: Router, public dialog: MatDialog) {
        this.formattedInterval = new BehaviorSubject<string[]>(this.getFormattedInterval());
        this.formattedInterval.subscribe(value => {
            this.interval = [
                this.formattedStringToMinutes(value[0]),
                this.formattedStringToMinutes(value[1])
            ];
        });

        this.fromAvailableFrames = this.fromAllMinutes;
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

                this.fromAvailableFrames = this.fromAllMinutes.filter(x =>
                    this.unavailableFrames.every(frame => frame[0] >= x + this.minutesOfReservation || frame[1] <= x));
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

    get reservationRequest(): ReservationRequest {
        // const timespanStart = Timespan.fromMinutes(this.interval[0]);
        //const timespanEnd = Timespan.fromMinutes(this.interval[1]);
        // this is just for the hotel feature branch > select options
        const timespanStart = Timespan.fromMinutes(this.interval[0] + 180);
        const timespanEnd = Timespan.fromMinutes(this.interval[0] + this.minutesOfReservation + 180);

        return {
            restaurantId: this.restaurantId,
            range: {
                start: timespanStart.toDate(this.date),
                end: timespanEnd.toDate(this.date)
            },
            participantsCount: this.participantsCount,
            tableIds: this.selectedTables.map(t => t.id)
        };
    }

    book(): void {
        this.bookingService.addReservation(this.reservationRequest)
            .subscribe(reservation => this.router.navigateByUrl('reservations'));
    }

    openDialogForChoosingTable(): void {
        const dialogRef = this.dialog.open(ChoosetableDialogComponent, {
            width: '500px',
            data: this.reservationRequest
        });

        dialogRef.afterClosed().subscribe(table => {
            if (table === undefined) { return; }
            if (table === null) {
                this.selectedTables = [];
                return;
            }
            this.selectedTables = [ table ];
        });
    }
}
