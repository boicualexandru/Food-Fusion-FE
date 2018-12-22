import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuService } from 'src/app/services/menu.service';
import { MenuItem } from 'src/app/models/menu/menuItem';

@Component({
    selector: 'app-item-remove-dialog',
    templateUrl: './item-remove-dialog.component.html'
})
export class ItemRemoveDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ItemRemoveDialogComponent>,
        private menuService: MenuService,
        @Inject(MAT_DIALOG_DATA) public menuItem: MenuItem) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    remove(): void {
        this.menuService.removeMenuItem(this.menuItem.id)
            .subscribe(() => this.dialogRef.close(true));
    }
}
