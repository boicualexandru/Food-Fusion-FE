import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenuItem } from 'src/app/models/menu/menuItem';
import { MenuService } from 'src/app/services/menu.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { serverSideValidator } from 'src/app/helpers/serverSideValidator';
import { DirtyTouchedSubmittedErrorStateMatcher } from 'src/app/helpers/dirtyTouchedSubmittedErrorStateMatcher';

@Component({
    selector: 'app-item-edit-dialog',
    templateUrl: './item-edit-dialog.component.html'
})
export class ItemEditDialogComponent implements OnInit {
    isNew: boolean;
    serverErrorMessage: BehaviorSubject<any> = new BehaviorSubject<any>({});

    form = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'name')
        ]),
        price: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'price')
        ])
    });

    matcher = new DirtyTouchedSubmittedErrorStateMatcher();

    constructor(public dialogRef: MatDialogRef<ItemEditDialogComponent>,
        private menuService: MenuService,
        @Inject(MAT_DIALOG_DATA) public data: { menuId: number, menuItem: MenuItem }) {
            this.isNew = data.menuItem == null;

            if (this.isNew) {
                this.initializeForm({
                    id: 0,
                    name: '',
                    price: 0
                });
            } else {
                this.initializeForm(data.menuItem);
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
        this.menuService.addMenuItem(this.data.menuId, this.formMenuItem)
            .subscribe(menuItem => this.dialogRef.close(menuItem));
    }

    edit(): void {
        this.menuService.editMenuItem(this.formMenuItem)
            .subscribe(menuItem => this.dialogRef.close(menuItem));
    }

    private get formMenuItem(): MenuItem {
        return {
            id: this.isNew ? 0 : this.data.menuItem.id,
            name: this.form.value.name,
            price: this.form.value.price
        };
    }

    private initializeForm(menuItem: MenuItem): void {
        this.form.setValue({
            name: menuItem.name,
            price: menuItem.price
        });
    }
}
