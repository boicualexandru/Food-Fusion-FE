import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];

    constructor(private restaurantsService: RestaurantsService) { }

    ngOnInit(): void {
        this.restaurantsService.getAll().subscribe(restaurants => this.restaurants = restaurants);
    }

    getImage(): string {
        const d = Math.random();

        return 'https://picsum.photos/800/600/?random&time=' + d.toString();
    }
}
