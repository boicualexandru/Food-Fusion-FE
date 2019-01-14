import { Component, OnInit, Input } from '@angular/core';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservation } from 'src/app/models/reservation/reservation';

@Component({
    selector: 'app-restaurant-reservations',
    templateUrl: './restaurant-reservations.component.html',
    styleUrls: ['./restaurant-reservations.component.scss']
})
export class RestaurantReservationsComponent implements OnInit {
    @Input() restaurantId: number;
    reservations: Reservation[];

    constructor(private reservationsService: ReservationsService) { }

    ngOnInit(): void {
        this.reservationsService.getRestaurantReservations(this.restaurantId)
            .subscribe(reservations => this.reservations = reservations);
    }
}
