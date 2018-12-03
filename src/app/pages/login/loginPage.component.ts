import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/loginModel';

@Component({
    templateUrl: './loginPage.component.html',
    styleUrls: ['./loginPage.component.scss']
})
export class LoginPageComponent implements OnInit {
    hidePass = true;

    email: string;
    password: string;

    constructor(private authService: AuthService) { }

    ngOnInit(): void { }

    login(): void {
        const loginModel: LoginModel = {
            email: this.email,
            password: this.password
        };
        this.authService.login(loginModel);

        // if (this.email === 'admin' && this.password === 'admin') {
        //     alert('Success');
        // } else {
        //     alert('Invalid credentials');
        // }
    }
}
