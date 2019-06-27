import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantDetailed } from 'src/app/models/restaurant/restaurantDetailed';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';

@Component({
    templateUrl: './restaurantPage.component.html',
    styleUrls: ['./restaurantPage.component.scss']
})
export class RestaurantPageComponent implements OnInit, OnDestroy {
    restaurant: RestaurantDetailed;
    activeTabIndex = 0;
    private sub: any;
    private tabRouteNames = ['book', 'menu', 'staff', 'reservations'];

    constructor(private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
        public authService: AuthService,
        public dialog: MatDialog,
        private location: Location) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.restaurantsService.getRestaurant(+params['id']).subscribe(
                restaurant => {
                    this.restaurant = restaurant;
                }
            );

            const tabIndex = this.tabRouteNames.indexOf(params['tab']);
            this.activeTabIndex = tabIndex >= 0 ? tabIndex : this.activeTabIndex;
        });
    }

    onTabChange(tabIndex) {
        this.location.replaceState('restaurant/' + this.restaurant.id + '/' + this.tabRouteNames[tabIndex]);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
