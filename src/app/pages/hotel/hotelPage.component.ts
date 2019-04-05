import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookingService } from 'src/app/services/booking service';
import { Timespan } from 'src/app/models/boilerplate/timespan';
import { Router } from '@angular/router';
import { ReservationRequest } from 'src/app/models/reservation/reservationRequest';
import { MatDialog } from '@angular/material';
import { Table } from 'src/app/models/restaurant/table';

@Component({
    templateUrl: './hotelPage.component.html',
    styleUrls: ['./hotelPage.component.scss']
})
export class HotelPageComponent implements OnInit {

    dateFrom: Date = new Date();
    dateTo: Date = new Date();

    ngOnInit(): void { }

    dateFilter(date: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) { return false; }
        return true;
    }


}
