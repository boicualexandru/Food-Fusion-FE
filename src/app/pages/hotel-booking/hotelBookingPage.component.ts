import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelFeature } from 'src/app/models/hotel/hotelFeature';
import { HotelRoom } from 'src/app/models/hotel/hotelRoom';
import { HotelRoomsFilters } from 'src/app/models/hotel/hotelRoomsFilters';
import * as moment from 'moment';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

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
    hotelFeatures: HotelFeature[] = [];
    rooms: HotelRoom[] = [];

    filters: HotelRoomsFilters;
    startMoment: moment.Moment = moment().utc(true).startOf('day').add(1, 'days');
    endMoment: moment.Moment = moment().utc(true).startOf('day').add(3, 'days');

    constructor(private hotelService: HotelService) {
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
        this.hotelService.getFeatures().subscribe(features => this.hotelFeatures = features);
        this.hotelService.getRooms().subscribe(rooms => this.rooms = rooms);
    }

    onStartDateChanged(): void {
        this.filters.timeRange.start = this.startMoment.utc(true).toDate();

        // if start date surpasses end date, change end date to start date + 1
        if (this.startMoment.utc(true).isAfter(this.endMoment.subtract(1, 'days'))) {
            this.endMoment = this.startMoment.utc(true).add(1, 'days');
            this.filters.timeRange.end = this.endMoment.toDate();
        } else {
            // load only if the end date will not be changed imediately
            this.loadFilteredRooms();
        }
    }

    onEndDateChanged(event: any): void {
        this.filters.timeRange.end = this.endMoment.utc(true).toDate();
        console.log(this.filters.timeRange.end);
        this.loadFilteredRooms();
    }

    loadFilteredRooms(): void {
        console.log(this.filters.timeRange.end);
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
}
