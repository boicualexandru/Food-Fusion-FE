import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant/restaurant';
import { HttpClient } from '@angular/common/http';
import { RestaurantDetailed } from '../models/restaurant/restaurantDetailed';
import { environment } from 'src/environments/environment';
import { RestaurantsFilters, restaurantsFiltersToHttpParams } from '../models/restaurant/restaurantsFilters';
import { Observable } from 'rxjs';

@Injectable()
export class RestaurantsService {
    constructor(private http: HttpClient) { }

    getAll(filters: RestaurantsFilters): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(environment.apiBaseUrl + '/Restaurants', {
                params: restaurantsFiltersToHttpParams(filters)
            });
    }

    getRestaurant(id: number) {
        return this.http.get<RestaurantDetailed>(environment.apiBaseUrl + '/Restaurants/' + id);
    }

    create(restaurant: Restaurant) {
        return this.http.post<number>(environment.apiBaseUrl + '/Restaurants', restaurant);
    }
}
