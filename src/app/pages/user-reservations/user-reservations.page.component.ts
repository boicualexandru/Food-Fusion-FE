import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation/reservation';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
    templateUrl: './user-reservations.page.component.html',
    styleUrls: ['./user-reservations.page.component.scss']
})
export class UserReservationsPageComponent implements OnInit {
    reservations: Reservation[] = [];

    constructor(private reservationsService: ReservationsService) { }

    ngOnInit(): void {
        this.reservationsService.getUserReservations()
            .subscribe(reservations => this.reservations = reservations);
    }
}
