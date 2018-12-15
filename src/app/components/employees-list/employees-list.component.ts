import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/models/employee/employee';
import { MatDialog } from '@angular/material';
import { EmpoyeeEditDialogComponent } from './employee-edit-dialog.component';

@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
    @Input() restaurantId: number;

    manager: Employee;
    employees: Employee[] = [];

    constructor(private employeesService: EmployeesService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.employeesService.getManagerByRestaurantId(this.restaurantId)
            .subscribe(manager => this.manager = manager);

        this.employeesService.getEmployeesByRestaurantId(this.restaurantId)
            .subscribe(employees => this.employees = employees);
    }

    openDialogForAddEmployee(): void {
        const dialogRef = this.dialog.open(EmpoyeeEditDialogComponent, {
            width: '250px',
            data: this.restaurantId
        });

        dialogRef.afterClosed().subscribe(employee => {
            if (employee == null) { return; }
            this.employees.push(employee);
        });
    }

    addEmployee(userEmail: string) {
        alert(userEmail);
    }

    openDialogForRemoveEmployee(userId: number): void {

    }
}
