import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantDetailed } from 'src/app/models/restaurant/restaurantDetailed';

@Component({
    templateUrl: './restaurantPage.component.html',
    styleUrls: ['./restaurantPage.component.scss']
})
export class RestaurantPageComponent implements OnInit, OnDestroy {
    restaurant: RestaurantDetailed;
    private sub: any;

    constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.restaurantsService.getRestaurant(+params['id']).subscribe(
                restaurant => this.restaurant = restaurant
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getImage(): string {
        const d = Math.random();

        return 'url(https://images.unsplash.com/photo-1532719880791-ea2b56fdfa87?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9)';
    }
}
