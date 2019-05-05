import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelReservationDetailed } from 'src/app/models/hotel/hotelReservationDetailed';

@Component({
    templateUrl: './hotel-user-reservations.page.component.html',
    styleUrls: ['./hotel-user-reservations.page.component.scss']
})
export class HotelUserReservationsPageComponent implements OnInit {
    reservations: HotelReservationDetailed[] = [];

    constructor(private hotelService: HotelService) { }

    ngOnInit(): void {
        this.hotelService.getUserReservations()
            .subscribe(reservations => this.reservations = reservations);
    }
}
