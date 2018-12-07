import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { UserState } from '../models/userState';

@Injectable()
export class AuthService {
    private apiPath = 'http://localhost:56416/api';

    private token: string;

    constructor(private http: HttpClient) { }

    login(loginModel: LoginModel) {
        console.log('AuthService login');
        this.http.post(this.apiPath + '/Token', loginModel, { responseType: 'text' })
            .subscribe(
                (token: string) => {
                    this.token = token;

                    const helper = new JwtHelperService();
                    const decodedToken = helper.decodeToken(token);

                    const userState: UserState = {
                        token: token,
                        expirationDate: helper.getTokenExpirationDate(token),
                        userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                        email: decodedToken['email'],
                        fullName: decodedToken['full_name'],
                        managedRestaurants: decodedToken['managed_restaurant'],
                        employeeOfRestaurants: decodedToken['employee_of_restaurant']
                    };

                    localStorage.setItem('jwt', token);
                    localStorage.setItem('userState', JSON.stringify(userState));
                    console.log(token);
                    console.log(userState);
                },
                error => { console.log(error); }
            );
    }

    logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userState');
    }
}
