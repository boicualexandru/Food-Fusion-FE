import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HotelRoomsFilters } from '../models/hotel/hotelRoomsFilters';
import { HotelRoom } from '../models/hotel/hotelRoom';
import { HotelFeature } from '../models/hotel/hotelFeature';
import { HotelRoomBooking } from '../models/hotel/hotelRoomBooking';
import { HotelReservationDetailed } from '../models/hotel/hotelReservationDetailed';

@Injectable()
export class HotelService {
    constructor(private http: HttpClient) { }

    getRooms(filters: HotelRoomsFilters = null) {
        return this.http.post<HotelRoom[]>(environment.apiBaseUrl + '/Hotel/Rooms', filters || {});
    }

    getFeatures() {
        return this.http.get<HotelFeature[]>(environment.apiBaseUrl + '/Hotel/Features');
    }

    bookRoom(bookingDetails: HotelRoomBooking) {
        return this.http.post(environment.apiBaseUrl + '/Hotel/Reservations', bookingDetails);
    }

    getAllReservations() {
        return this.http.get<HotelReservationDetailed[]>(environment.apiBaseUrl + '/Hotel/Reservations');
    }

    getUserReservations() {
        return this.http.get<HotelReservationDetailed[]>(environment.apiBaseUrl + '/Hotel/UserReservations');
    }
}
