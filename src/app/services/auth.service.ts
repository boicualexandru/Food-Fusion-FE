import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';
import { UserState } from '../models/userState';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { RegisterModel } from '../models/registerModel';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private tokenSubject: BehaviorSubject<string>;
    private userStateSubject: BehaviorSubject<UserState>;

    public get currentUser(): UserState {
        return this.userStateSubject.value;
    }

    public get currentUserObservable(): Observable<UserState> {
        return this.userStateSubject.asObservable();
    }

    public get isAdmin(): boolean {
        if (this.currentUser == null) { return false; }
        return this.currentUser.role === 'Admin';
    }

    public isManager(restaurantId: number): boolean {
        if (this.currentUser == null) { return false; }
        if (this.currentUser.managedRestaurants == null) { return false; }
        return this.currentUser.managedRestaurants.includes(restaurantId);
    }

    public isEmployee(restaurantId: number): boolean {
        if (this.currentUser == null) { return false; }
        if (this.currentUser.employeeOfRestaurants == null) { return false; }
        return this.currentUser.employeeOfRestaurants.includes(restaurantId);
    }

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('jwt'));

        const userState: UserState = this.parseToken(this.tokenSubject.value);
        this.userStateSubject = new BehaviorSubject<UserState>(userState);
    }

    login(loginModel: LoginModel): Observable<string> {
        return this.http.post(environment.apiBaseUrl + '/Token', loginModel, { responseType: 'text' })
            .pipe(tap(token => this.storeToken(token)));
    }

    register(registerModel: RegisterModel): Observable<string> {
        return this.http.post(environment.apiBaseUrl + '/Token/Register', registerModel, { responseType: 'text' })
            .pipe(tap(token => this.storeToken(token)));
    }

    logout() {
        localStorage.removeItem('jwt');
        this.tokenSubject.next(null);
        this.userStateSubject.next(null);
    }

    private storeToken(token: string): void {
        const userState: UserState = this.parseToken(token);

        localStorage.setItem('jwt', token);

        this.tokenSubject.next(token);
        this.userStateSubject.next(userState);
    }

    private parseToken(token: string): UserState {
        if (token == null) {
            return null;
        }

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);

        if (typeof decodedToken['managed_restaurant'] === 'string') {
            decodedToken['managed_restaurant'] = [decodedToken['managed_restaurant']];
        }
        if (typeof decodedToken['employee_of_restaurant'] === 'string') {
            decodedToken['employee_of_restaurant'] = [decodedToken['employee_of_restaurant']];
        }

        const userState: UserState = {
            token: token,
            expirationDate: helper.getTokenExpirationDate(token),
            userId: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decodedToken['email'],
            fullName: decodedToken['full_name'],
            role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            managedRestaurants: (decodedToken['managed_restaurant'] || []).map(rId => Number(rId)),
            employeeOfRestaurants: (decodedToken['employee_of_restaurant'] || []).map(rId => Number(rId))
        };

        return userState;
    }
}
