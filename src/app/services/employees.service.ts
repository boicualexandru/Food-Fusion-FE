import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
        return this.http.post<Employee>(this.apiPath + '/Restaurants/' + restaurantId + '/Employees', JSON.stringify(email),
            {headers: {'Content-Type': 'application/json'}});
    }

    removeEmployee(restaurantId: number, userId: number) {
        return this.http.delete<void>(this.apiPath + '/Restaurants/' + restaurantId + '/Employees/' + userId,
            {headers: {'Content-Type': 'application/json'}});
    }
}
