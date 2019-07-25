import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant/restaurant';
import { HttpClient } from '@angular/common/http';
import { RestaurantDetailed } from '../models/restaurant/restaurantDetailed';
import { environment } from 'src/environments/environment';

@Injectable()
export class RestaurantsService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Restaurant[]>(environment.apiBaseUrl + '/Restaurants');
    }

    getRestaurant(id: number) {
        return this.http.get<RestaurantDetailed>(environment.apiBaseUrl + '/Restaurants/' + id);
    }

    create(restaurant: Restaurant) {
        return this.http.post<number>(environment.apiBaseUrl + '/Restaurants', restaurant);
    }
}
