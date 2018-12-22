import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { RestaurantDetailed } from 'src/app/models/restaurant/restaurantDetailed';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItem } from 'src/app/models/menu/menuItem';
import { MatDialog } from '@angular/material';
import { ItemEditDialogComponent } from './menu/item-edit-dialog/item-edit-dialog.component';
import { MenuService } from 'src/app/services/menu.service';
import { ItemRemoveDialogComponent } from './menu/item-remove-dialog/item-remove-dialog.component';

@Component({
    templateUrl: './restaurantPage.component.html',
    styleUrls: ['./restaurantPage.component.scss']
})
export class RestaurantPageComponent implements OnInit, OnDestroy {
    restaurant: RestaurantDetailed;
    isManager: boolean;
    isEmmployee: boolean;
    private sub: any;

    constructor(private route: ActivatedRoute,
        private restaurantsService: RestaurantsService,
        private authService: AuthService,
        public dialog: MatDialog) { }

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

    openDialogForAddItem(): void {
        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '250px',
            data: { menuId: this.restaurant.menu.id }
        });

        dialogRef.afterClosed().subscribe(menuItem => {
            if (menuItem == null) { return; }
            this.restaurant.menu.items.push(menuItem);
        });
    }

    openDialogForEditItem(menuItem: MenuItem): void {
        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '250px',
            data: { menuId: this.restaurant.menu.id, menuItem: menuItem }
        });

        dialogRef.afterClosed().subscribe(savedMenuItem => {
            if (savedMenuItem == null) { return; }

            const itemIndex = this.getItemIndexById(savedMenuItem.id);
            if (itemIndex < 0) { return; }
            this.restaurant.menu.items[itemIndex] = savedMenuItem;
        });
    }

    openDialogForRemoveItem(menuItem: MenuItem): void {
        const dialogRef = this.dialog.open(ItemRemoveDialogComponent, {
            width: '250px',
            data: menuItem
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success !== true) { return; }

            const itemIndex = this.getItemIndexById(menuItem.id);
            if (itemIndex < 0) { return; }
            this.restaurant.menu.items.splice(itemIndex, 1);
        });
    }

    private getItemIndexById(itemId: number) {
        return this.restaurant.menu.items.findIndex(item => item.id === itemId);
    }

    getImage(): string {
        const d = Math.random();

        // tslint:disable-next-line:max-line-length
        return 'url(https://images.unsplash.com/photo-1516709315038-c53bf87e8f48?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1900&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9)';
    }
}
