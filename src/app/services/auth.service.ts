import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { UserState } from '../models/userState';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    private apiPath = 'http://localhost:56416/api';

    private tokenSubject: BehaviorSubject<string>;
    private userStateSubject: BehaviorSubject<UserState>;

    public get currentUser(): UserState {
        return this.userStateSubject.value;
    }

    public get currentUserObservable(): Observable<UserState> {
        return this.userStateSubject.asObservable();
    }

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('jwt'));

        const userState: UserState = this.parseToken(this.tokenSubject.value);
        this.userStateSubject = new BehaviorSubject<UserState>(userState);
    }

    login(loginModel: LoginModel) {
        console.log('AuthService login');
        this.http.post(this.apiPath + '/Token', loginModel, { responseType: 'text' })
            .subscribe(
                (token: string) => {
                    const userState: UserState = this.parseToken(token);

                    localStorage.setItem('jwt', token);

                    this.tokenSubject.next(token);
                    this.userStateSubject.next(userState);

                    console.log(token);
                    console.log(userState);
                },
                error => { console.log(error); }
            );
    }

    logout() {
        localStorage.removeItem('jwt');
        this.tokenSubject.next(null);
        this.userStateSubject.next(null);
    }

    private parseToken(token: string): UserState {
        if (token == null) {
            return null;
        }

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

        return userState;
    }
}
