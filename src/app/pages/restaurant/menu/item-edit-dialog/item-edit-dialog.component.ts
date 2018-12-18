import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuItem } from 'src/app/models/menu/menuItem';
import { MenuService } from 'src/app/services/menu.service';

@Component({
    selector: 'app-item-edit-dialog',
    templateUrl: './item-edit-dialog.component.html',
    styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent implements OnInit {
    private isNew: boolean;

    constructor(public dialogRef: MatDialogRef<ItemEditDialogComponent>,
        private menuService: MenuService,
        @Inject(MAT_DIALOG_DATA) public data: { menuId: number, menuItem: MenuItem }) {
            this.isNew = data.menuItem == null;
            if (this.isNew) {
                this.data.menuItem = {
                    id: 0,
                    name: '',
                    price: 0
                };
            }
        }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    save(): void {
        if (this.isNew) {
            this.add();
        } else {
            this.edit();
        }
    }

    add(): void {
        this.menuService.addMenuItem(this.data.menuId, this.data.menuItem)
            .subscribe(menuItem => this.dialogRef.close(menuItem));
    }

    edit(): void {
        this.menuService.editMenuItem(this.data.menuItem)
            .subscribe(menuItem => this.dialogRef.close(menuItem));
    }
}
