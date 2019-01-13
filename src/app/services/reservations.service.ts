import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Reservation } from '../models/reservation/reservation';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ReservationsService {
    constructor(private http: HttpClient,
        private authService: AuthService) {}

    getUserReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>(environment.apiBaseUrl + '/Reservations');
    }
}
