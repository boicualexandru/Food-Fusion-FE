import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from 'src/app/models/loginModel';
import { Router } from '@angular/router';

@Component({
    templateUrl: './loginPage.component.html',
    styleUrls: ['./loginPage.component.scss']
})
export class LoginPageComponent implements OnInit {
    hidePass = true;
    showSpinner = false;

    email: string;
    password: string;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void { }

    login(): void {
        this.showSpinner = true;

        const loginModel: LoginModel = {
            email: this.email,
            password: this.password
        };

        this.authService.login(loginModel).subscribe(
            token =>  {
                this.showSpinner = false;
                this.router.navigate(['/restaurants']);
            }
        );
    }
}
