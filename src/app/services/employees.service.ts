import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeesService {
    constructor(private http: HttpClient) { }

    getEmployeesByRestaurantId(id: number) {
        return this.http.get<Employee[]>(environment.apiBaseUrl + '/Restaurants/' + id + '/Employees');
    }

    getManagerByRestaurantId(id: number) {
        return this.http.get<Employee>(environment.apiBaseUrl + '/Restaurants/' + id + '/Manager');
    }

    addEmployeeByEmail(restaurantId: number, email: string) {
        return this.http.post<Employee>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Employees', JSON.stringify(email),
            {headers: {'Content-Type': 'application/json'}});
    }

    removeEmployee(restaurantId: number, userId: number) {
        return this.http.delete<void>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Employees/' + userId,
            {headers: {'Content-Type': 'application/json'}});
    }
}
