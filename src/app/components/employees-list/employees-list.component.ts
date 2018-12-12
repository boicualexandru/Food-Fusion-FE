import { Component, OnInit, Input } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/models/employee/employee';

@Component({
    selector: 'app-employees-list',
    templateUrl: './employees-list.component.html',
    styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
    @Input() restaurantId: number;

    manager: Employee;
    employees: Employee[] = [];

    constructor(private employeesService: EmployeesService) { }

    ngOnInit(): void {
        this.employeesService.getManagerByRestaurantId(this.restaurantId)
            .subscribe(manager => this.manager = manager);

        this.employeesService.getEmployeesByRestaurantId(this.restaurantId)
            .subscribe(employees => this.employees = employees);
    }
}
