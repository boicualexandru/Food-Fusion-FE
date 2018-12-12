import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantDetailed } from 'src/app/models/restaurant/restaurantDetailed';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './restaurantPage.component.html',
    styleUrls: ['./restaurantPage.component.scss']
})
export class RestaurantPageComponent implements OnInit, OnDestroy {
    restaurant: RestaurantDetailed;
    isManager: boolean;
    isEmmployee: boolean;
    private sub: any;

    constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService, private authService: AuthService) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.restaurantsService.getRestaurant(+params['id']).subscribe(
                restaurant => {
                    this.restaurant = restaurant;
                    this.isManager = this.authService.isManager(this.restaurant.id);
                    this.isEmmployee = this.authService.isEmployee(this.restaurant.id);
                }
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getImage(): string {
        const d = Math.random();

        return 'url(https://images.unsplash.com/photo-1516709315038-c53bf87e8f48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9)';
    }
}
