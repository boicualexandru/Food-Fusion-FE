import { Component, OnInit, ChangeDetectorRef, Inject, ViewChildren, QueryList } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { AgmInfoWindow, AgmMarker } from '@agm/core';
import { Meta } from '@angular/platform-browser';
import { PriceRange } from 'src/app/models/restaurant/priceRange';
import { MatDialog } from '@angular/material';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';
import { RestaurantsFilters } from 'src/app/models/restaurant/restaurantsFilters';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];
    focusedRestaurantId?: number = null;
    filters: RestaurantsFilters = {
        cuisineIds: [],
        priceRanges: []
    };
    clientHeight: number;
    mapView = true;

    defaultMarkerUrl = 'assets/img/map-marker-default.png';
    accentMarkerUrl = 'assets/img/map-marker-accent.png';

    @ViewChildren('infoWindow') infoWindows: QueryList<AgmInfoWindow>;

    constructor(
        private restaurantsService: RestaurantsService,
        @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        private meta: Meta) {
        this.clientHeight = window.innerHeight;

        this.meta.addTag({ name: 'og:title', content: 'FoodFusion | Restaurants' });
        this.meta.addTag({ name: 'og:image', content: 'assets/img/FoodFusionLogo.png' });
    }

    ngOnInit(): void {
        this.loadRestaurants();
    }

    loadRestaurants(): void {
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

    getPriceIconCount(priceRange: PriceRange): number {
        switch (priceRange) {
            case PriceRange.Low:
                return 1;
            case PriceRange.Medium:
                return 2;
            case PriceRange.High:
                return 3;
            default:
                return 0;
        }
    }

    openAdvancedFiltersDialog(): void {
        const dialogRef = this.dialog.open(AdvancedFiltersDialogComponent, {
            width: '400px',
            data: { cuisineIds: this.filters.cuisineIds, priceRanges: this.filters.priceRanges }
        });

        dialogRef.afterClosed().subscribe((filters: { cuisineIds: number[], priceRanges: PriceRange[] }) => {
            if (filters == null) {
                return;
            }

            this.filters.cuisineIds = filters.cuisineIds || [];
            this.filters.priceRanges = filters.priceRanges || [];
            this.loadRestaurants();
        });
    }
}
