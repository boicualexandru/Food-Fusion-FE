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
        return this.http.post(this.apiPath + '/Restaurants/' + restaurantId + '/Employees', JSON.stringify(email),
            {headers: {'Content-Type': 'application/json'}});
            // .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
}
