import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant/restaurant';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestaurantsService {
    private apiPath = 'http://localhost:56416/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Restaurant[]>(this.apiPath + '/Restaurants');
    }
}
