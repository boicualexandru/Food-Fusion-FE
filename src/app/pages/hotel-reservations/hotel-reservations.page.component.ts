import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelReservationDetailed } from 'src/app/models/hotel/hotelReservationDetailed';

@Component({
    templateUrl: './hotel-reservations.page.component.html',
    styleUrls: ['./hotel-reservations.page.component.scss']
})
export class HotelReservationsPageComponent implements OnInit {
    reservations: HotelReservationDetailed[] = [];

    constructor(private hotelService: HotelService) { }

    ngOnInit(): void {
        this.hotelService.getAllReservations()
            .subscribe(reservations => this.reservations = reservations);
    }
}
