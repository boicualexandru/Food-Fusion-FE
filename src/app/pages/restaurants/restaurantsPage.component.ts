import { Component, OnInit, ChangeDetectorRef, Inject, ViewChildren, QueryList } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { AgmInfoWindow, AgmMarker } from '@agm/core';
import { Meta } from '@angular/platform-browser';
import { PriceRange } from 'src/app/models/restaurant/priceRange';
import { MatDialog } from '@angular/material';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';
import { RestaurantsFilters, restaurantsFiltersToHttpParams } from 'src/app/models/restaurant/restaurantsFilters';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './restaurantsPage.component.html',
    styleUrls: ['./restaurantsPage.component.scss']
})
export class RestaurantsPageComponent implements OnInit {
    restaurants: Restaurant[] = [];
    focusedRestaurantId?: number = null;
    filters: RestaurantsFilters = {
        searchText: '',
        cuisineIds: [],
        priceRanges: []
    };
    isLoading = false;
    clientHeight: number;
    mapView = true;

    defaultMarkerUrl = 'assets/img/map-marker-default.png';
    accentMarkerUrl = 'assets/img/map-marker-accent.png';

    @ViewChildren('infoWindow') infoWindows: QueryList<AgmInfoWindow>;

    constructor(
        private restaurantsService: RestaurantsService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog,
        private meta: Meta) {
        this.clientHeight = window.innerHeight;

        this.meta.addTag({ name: 'og:title', content: 'FoodFusion | Restaurants' });
        this.meta.addTag({ name: 'og:image', content: 'assets/img/FoodFusionLogo.png' });
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                if (params.searchText != null) {
                    this.filters.searchText = params.searchText;
                }

                if (params.cuisineIds != null && params.cuisineIds.length > 0) {
                    this.filters.cuisineIds = params.cuisineIds.map(cuisineId => +cuisineId);
                }

                if (params.priceRanges != null && params.priceRanges.length > 0) {
                    this.filters.priceRanges = params.priceRanges.map(priceRange => +priceRange);
                }
            });
        this.loadRestaurants();
    }

    loadRestaurants(): void {
        this.isLoading = true;

        this.router.navigate([], {
            queryParams: restaurantsFiltersToHttpParams(this.filters)
        });

        this.restaurantsService.getAll(this.filters).subscribe(restaurants => {
            this.restaurants = restaurants;
            this.isLoading = false;
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
