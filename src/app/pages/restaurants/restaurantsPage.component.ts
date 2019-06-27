import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];
    clientHeight: number;

    constructor(private restaurantsService: RestaurantsService) {
        this.clientHeight = window.innerHeight;
    }

    ngOnInit(): void {
        this.restaurantsService.getAll().subscribe(restaurants => this.restaurants = restaurants);
    }
}
