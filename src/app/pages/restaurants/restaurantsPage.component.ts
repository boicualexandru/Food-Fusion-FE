import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { Router } from '@angular/router';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];

    constructor(private router: Router, private restaurantsService: RestaurantsService) { }

    ngOnInit(): void {
        this.restaurantsService.getAll().subscribe(restaurants => this.restaurants = restaurants);
    }

    getImage(): string {
        const d = Math.random();

        return 'https://source.unsplash.com/800x600/?art,street&time=' + d.toString();
    }
}
