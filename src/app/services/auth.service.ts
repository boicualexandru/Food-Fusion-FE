import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';

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
                    console.log('success');
                    console.log(token); this.token = token; },
                error => { console.log(error); }
            );
    }
}
