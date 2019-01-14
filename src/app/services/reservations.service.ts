import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ReservationDetailed } from '../models/reservation/reservationDetailed';

@Injectable()
export class ReservationsService {
    constructor(private http: HttpClient,
        private authService: AuthService) {}

    getUserReservations(): Observable<ReservationDetailed[]> {
        return this.http.get<ReservationDetailed[]>(environment.apiBaseUrl + '/Reservations');
    }

    getRestaurantReservations(restaurantId: number): Observable<ReservationDetailed[]> {
        return this.http.get<ReservationDetailed[]>(environment.apiBaseUrl + '/Restaurant/' + restaurantId + '/Reservations');
    }
}
