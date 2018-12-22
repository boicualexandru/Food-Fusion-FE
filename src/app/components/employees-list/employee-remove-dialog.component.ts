import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/models/employee/employee';

@Component({
    selector: 'app-employee-remove-dialog',
    templateUrl: './employee-remove-dialog.component.html'
})
export class EmployeeRemoveDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<EmployeeRemoveDialogComponent>,
        private employeesService: EmployeesService,
        @Inject(MAT_DIALOG_DATA) public employeeRestaurant: { restaurantId: number, employee: Employee }) { }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    remove(): void {
        this.employeesService.removeEmployee(this.employeeRestaurant.restaurantId, this.employeeRestaurant.employee.userId)
            .subscribe(() => this.dialogRef.close(true));
    }
}
