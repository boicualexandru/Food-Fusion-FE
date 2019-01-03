import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateRange } from '../models/boilerplate/dateRange';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookingService {
    constructor(private http: HttpClient) { }

    getUnavailableFrames(restaurantId: number, participantsCount: number, dateRange: DateRange) {
        return this.http.get<DateRange[]>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Unavailability' +
            '?participantsCount=' + participantsCount + '&start=' + dateRange.start + '&end=' + dateRange.end);
    }
}
