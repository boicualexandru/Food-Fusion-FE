import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/registerModel';

@Component({
    templateUrl: './registerPage.component.html',
    styleUrls: ['../login/loginPage.component.scss']
})
export class RegisterPageComponent implements OnInit {
    hidePass = true;
    showSpinner = false;
    showError = false;

    email: string;
    fullName: string;
    password: string;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void { }

    register(): void {
        this.showSpinner = true;
        const registerModel: RegisterModel = {
            email: this.email,
            fullName: this.fullName,
            password: this.password
        };

        this.authService.register(registerModel).subscribe(
            token =>  {
                this.showSpinner = false;
                this.router.navigate(['/hotel']);
            },
            error => {
                this.showError = true;
                this.showSpinner = false;
            }
        );
    }
}
