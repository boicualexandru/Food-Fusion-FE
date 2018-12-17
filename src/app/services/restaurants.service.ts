import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant/restaurant';
import { HttpClient } from '@angular/common/http';
import { RestaurantDetailed } from '../models/restaurant/restaurantDetailed';

@Injectable()
export class RestaurantsService {
    private apiPath = 'http://localhost:56416/api';

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Restaurant[]>(this.apiPath + '/Restaurants');
    }

    getRestaurant(id: number) {
        return this.http.get<RestaurantDetailed>(this.apiPath + '/Restaurants/' + id);
    }

    create(restaurant: Restaurant) {
        return this.http.post<number>(this.apiPath + '/Restaurants', restaurant);
    }
}
