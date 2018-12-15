import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
    selector: 'app-employee-edit-dialog',
    templateUrl: './employee-edit-dialog.component.html'
})
export class EmpoyeeEditDialogComponent implements OnInit {
    email = '';

    constructor(public dialogRef: MatDialogRef<EmpoyeeEditDialogComponent>,
        private employeesService: EmployeesService,
        @Inject(MAT_DIALOG_DATA) private restaurantId: number) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    add(): void {
        this.employeesService.addEmployeeByEmail(this.restaurantId, this.email)
            .subscribe(employee => this.dialogRef.close(employee));
    }
}
