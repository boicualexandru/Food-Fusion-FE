import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-employee-edit-dialog',
    templateUrl: './employee-edit-dialog.component.html'
})
export class EmpoyeeEditDialogComponent implements OnInit {
    email = '';

    constructor(public dialogRef: MatDialogRef<EmpoyeeEditDialogComponent>) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
