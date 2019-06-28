import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelFeature } from 'src/app/models/hotel/hotelFeature';
import { HotelRoom } from 'src/app/models/hotel/hotelRoom';
import { HotelRoomsFilters } from 'src/app/models/hotel/hotelRoomsFilters';
import * as moment from 'moment';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material';
import { BookRoomDialogComponent } from './book-room-dialog/book-room-dialog.component';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    templateUrl: './hotelBookingPage.component.html',
    styleUrls: ['./hotelBookingPage.component.scss'],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class HotelBookingPageComponent implements OnInit {
    rooms: HotelRoom[] = [];

    filters: HotelRoomsFilters;
    startMoment: moment.Moment = moment().utc(true).startOf('day').add(1, 'days');
    endMoment: moment.Moment = moment().utc(true).startOf('day').add(3, 'days');

    selectedFeatures: HotelFeature[] = [];

    constructor(private hotelService: HotelService, public dialog: MatDialog) {
        this.filters = {
            featureIds: [],
            guests: 1,
            timeRange: {
                start: this.startMoment.toDate(),
                end: this.endMoment.toDate()
            }
        };
    }

    ngOnInit(): void {
        this.loadFilteredRooms();
    }

    onStartDateChanged(): void {
        this.filters.timeRange.start = this.startMoment.utc(true).toDate();

        // if start date surpasses end date, change end date to start date + 1
        if (this.startMoment.utc(true).isAfter(this.endMoment.subtract(1, 'days'))) {
            this.endMoment = this.startMoment.utc(true).add(1, 'days');
            this.filters.timeRange.end = this.endMoment.toDate();
        }

        this.loadFilteredRooms();
    }

    onEndDateChanged(event: any): void {
        this.filters.timeRange.end = this.endMoment.utc(true).toDate();
        this.loadFilteredRooms();
    }

    loadFilteredRooms(): void {
        this.hotelService.getRooms(this.filters).subscribe(rooms => this.rooms = rooms);
    }

    isPastDate = (date: Date) => moment(date).isBefore(moment().utc(true).startOf('day'));
    isBefore = (date: Date, secondDate: Date) => moment(date).isBefore(moment(secondDate).startOf('day'));

    startDateFilter = (date: Date) => !this.isPastDate(date);
    endDateFilter = (date: Date) => !this.isPastDate(date)
        && !this.isBefore(date, this.filters.timeRange.start)

    decrementGuests = () => {
        this.filters.guests--;
        this.loadFilteredRooms();
    }
    incrementGuests = () => {
        this.filters.guests++;
        this.loadFilteredRooms();
    }

    getRoomView(room: HotelRoom): HotelFeature {
        return room.features.filter(f => f.category === 'ViewType')[0] || null;
    }

    getBedType(room: HotelRoom): HotelFeature {
        return room.features.filter(f => f.category === 'BedType')[0] || null;
    }

    getAmenities(room: HotelRoom): HotelFeature[] {
        return room.features.filter(f => f.category === 'Amenities') || null;
    }

    openAdvancedFiltersDialog(): void {
        const dialogRef = this.dialog.open(AdvancedFiltersDialogComponent, {
            width: '400px',
            data: this.filters.featureIds
        });

        dialogRef.afterClosed().subscribe((features: HotelFeature[]) => {
            if (features == null) {
                return;
            }

            this.filters.featureIds = features.map(f => f.id);
            this.selectedFeatures = features;
            this.loadFilteredRooms();
        });
    }

    bookRoom(room: number): void {
        const dialogRef = this.dialog.open(BookRoomDialogComponent, {
            width: '400px',
            data: { filters: this.filters, room: room }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.loadFilteredRooms();
        });
    }
}
