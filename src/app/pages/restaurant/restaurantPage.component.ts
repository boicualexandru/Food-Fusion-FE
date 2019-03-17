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
    // 47.1628553,27.5811555
    lat = 47.1628553;
    lng = 27.5811555;

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

    getImage(): string {
        const d = Math.random();

        // tslint:disable-next-line:max-line-length
        return 'url(https://images.unsplash.com/photo-1479044769763-c28e05b5baa5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)';
    }
}
