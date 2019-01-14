import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationDetailed } from 'src/app/models/reservation/reservationDetailed';

@Component({
    templateUrl: './user-reservations.page.component.html',
    styleUrls: ['./user-reservations.page.component.scss']
})
export class UserReservationsPageComponent implements OnInit {
    reservations: ReservationDetailed[] = [];

    constructor(private reservationsService: ReservationsService) { }

    ngOnInit(): void {
        this.reservationsService.getUserReservations()
            .subscribe(reservations => this.reservations = reservations);
    }
}
