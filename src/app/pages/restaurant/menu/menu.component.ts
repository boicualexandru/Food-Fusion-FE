import { Component, OnInit, Input } from '@angular/core';
import { Menu, MenuElement } from 'src/app/models/menu/menu';
import { MatDialog } from '@angular/material';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component';
import { MenuItem } from 'src/app/models/menu/menuItem';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
    @Input() restaurantId: number;
    @Input() menu: Menu;
    menuElement: MenuElement;

    constructor(
        public dialog: MatDialog,
        private menuService: MenuService,
        public authService: AuthService) { }

    ngOnInit(): void {
        this.menuElement = this.menuService.getMenuByRestaurantId(this.restaurantId);
    }

    openDialogForAddItem(): void {
        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '250px',
            data: { menuId: this.menu.id }
        });

        dialogRef.afterClosed().subscribe(menuItem => {
            if (menuItem == null) { return; }
            this.menu.items.push(menuItem);
        });
    }

    openDialogForEditItem(menuItem: MenuItem): void {
        const dialogRef = this.dialog.open(ItemEditDialogComponent, {
            width: '250px',
            data: { menuId: this.menu.id, menuItem: menuItem }
        });

        dialogRef.afterClosed().subscribe(savedMenuItem => {
            if (savedMenuItem == null) { return; }

            const itemIndex = this.getItemIndexById(savedMenuItem.id);
            if (itemIndex < 0) { return; }
            this.menu.items[itemIndex] = savedMenuItem;
        });
    }

    openDialogForRemoveItem(menuItem: MenuItem): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '250px',
            data: {
                title: 'Remove Item',
                content: menuItem.name,
                action: {
                    name: 'Remove',
                    color: 'warn',
                    method: this.menuService.removeMenuItem(menuItem.id)
                }
            }
        });

        dialogRef.afterClosed().subscribe(success => {
            if (success !== true) { return; }

            const itemIndex = this.getItemIndexById(menuItem.id);
            if (itemIndex < 0) { return; }
            this.menu.items.splice(itemIndex, 1);
        });
    }

    private getItemIndexById(itemId: number) {
        return this.menu.items.findIndex(item => item.id === itemId);
    }
}
