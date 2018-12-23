import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent<T> implements OnInit {
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent<T>>,
        @Inject(MAT_DIALOG_DATA) public data: {
                title: string,
                content: string,
                action: {
                    method: Observable<T>,
                    name: string,
                    color: string
                }
            }) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onActionClick(): void {
        this.data.action.method.subscribe(() => this.dialogRef.close(true));
    }
}
