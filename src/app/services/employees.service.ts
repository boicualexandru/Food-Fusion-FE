import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeesService {
    private apiPath = 'http://localhost:56416/api';

    constructor(private http: HttpClient) { }

    getEmployeesByRestaurantId(id: number) {
        return this.http.get<Employee[]>(this.apiPath + '/Restaurants/' + id + '/Employees');
    }

    getManagerByRestaurantId(id: number) {
        return this.http.get<Employee>(this.apiPath + '/Restaurants/' + id + '/Manager');
    }

    addEmployeeByEmail(restaurantId: number, email: string) {
        return this.http.post<Employee>(this.apiPath + '/Restaurants/' + restaurantId + '/Employees', email,
            {headers: {'Content-Type': 'application/json'}});
    }
}
