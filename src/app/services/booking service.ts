import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateRange } from '../models/boilerplate/dateRange';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class BookingService {
    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    getUnavailableFramesByDay(restaurantId: number, participantsCount: number, day: Date): Observable<DateRange[]> {
        const start: Date = new Date(day);
        start.setHours(0, 0, 0, 0);

        const end: Date = new Date(day);
        end.setHours(23, 59, 59, 0);

        return this.http.get<DateRange[]>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Unavailability' +
            '?participantsCount=' + participantsCount +
            '&start=' + this.datePipe.transform(start, environment.apiDateFormatMinutePrecision) +
            '&end=' + this.datePipe.transform(end, environment.apiDateFormatMinutePrecision))
            .pipe(
                map(unavailableFrames => unavailableFrames
                    .map(unavailableFrame => {
                        return {
                            start: new Date(unavailableFrame.start),
                            end: new Date(unavailableFrame.end)
                        };
                    })
                )
            );
    }
}
