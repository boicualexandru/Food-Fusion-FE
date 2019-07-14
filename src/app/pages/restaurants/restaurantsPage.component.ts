import { Component, OnInit, ChangeDetectorRef, Inject, ViewChildren, QueryList } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { AgmInfoWindow, AgmMarker } from '@agm/core';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];
    focusedRestaurantId?: number = null;
    clientHeight: number;
    mapView = true;

    defaultMarkerUrl = 'assets/img/map-marker-default.png';
    accentMarkerUrl = 'assets/img/map-marker-accent.png';

    @ViewChildren('infoWindow') infoWindows: QueryList<AgmInfoWindow>;

    constructor(
        private restaurantsService: RestaurantsService,
        @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef) {
        this.clientHeight = window.innerHeight;
    }

    ngOnInit(): void {
        this.restaurantsService.getAll().subscribe(restaurants => {
            this.restaurants = restaurants;
        });
    }

    cardMouseEnter(restaurantId: number) {
        this.focusedRestaurantId = restaurantId;
    }

    cardMouseLeave(restaurantId: number) {
        this.focusedRestaurantId = null;
    }

    isFocused(restaurantId: number): boolean {
        return this.focusedRestaurantId === restaurantId;
    }

    clearInfoWindows(): void {
        this.changeDetectorRef.detectChanges();
        this.infoWindows.forEach(element => element.close());
    }
}
