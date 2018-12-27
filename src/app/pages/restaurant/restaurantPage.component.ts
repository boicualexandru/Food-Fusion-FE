import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantDetailed } from 'src/app/models/restaurant/restaurantDetailed';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
    templateUrl: './restaurantPage.component.html',
    styleUrls: ['./restaurantPage.component.scss']
})
export class RestaurantPageComponent implements OnInit, OnDestroy {
    restaurant: RestaurantDetailed;
    activeTabIndex = 0;
    private sub: any;
    private tabRouteNames = ['description', 'menu', 'staff'];

    participantsCount = 2;
    interval: number[] = [100, 350];
    formattedInterval: BehaviorSubject<string[]>;

    get intervalStart(): string {
        return this.formattedInterval.value[0];
    }
    set intervalStart(value: string) {
        const interval = this.formattedInterval.value;
        interval[0] = value;
        this.formattedInterval.next(interval);
    }

    get intervalEnd(): string {
        return this.formattedInterval.value[1];
    }
    set intervalEnd(value: string) {
        const interval = this.formattedInterval.value;
        interval[1] = value;
        this.formattedInterval.next(interval);
    }

    onSlideMove(event: any) {
        this.interval = event.value;
        this.formattedInterval.next(this.getFormattedInterval());
    }

    constructor(private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
        public authService: AuthService,
        public dialog: MatDialog,
        private location: Location) {
                this.formattedInterval = new BehaviorSubject<string[]>(this.getFormattedInterval());
                this.formattedInterval.subscribe(value => {
                    this.interval = [
                        this.timeStringToMinutes(value[0]),
                        this.timeStringToMinutes(value[1])
                    ];
                });
    }

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

    formatLabel(value: number | null) {
        let minutesCount = value;

        if (!value) {
            minutesCount = 0;
        }
        const hours = Math.floor(minutesCount / 60);
        const minutes = minutesCount - (hours * 60);

        let hoursString: string = hours.toString();
        if (hours < 10) { hoursString = '0' + hoursString; }

        let minutesString: string = minutes.toString();
        if (minutes < 10) { minutesString = '0' + minutesString; }

        return hoursString + ':' + minutesString;
    }

    getFormattedInterval(): string[] {
        return [
            this.formatLabel(this.interval[0]),
            this.formatLabel(this.interval[1])
        ];
    }

    private timeStringToMinutes(time: string) {
        const hoursMinutes = time.split(/[.:]/);
        const hours = parseInt(hoursMinutes[0], 10);
        const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return minutes + hours * 60;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getImage(): string {
        const d = Math.random();

        // tslint:disable-next-line:max-line-length
        return 'url(https://images.unsplash.com/photo-1516709315038-c53bf87e8f48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9)';
    }
}
