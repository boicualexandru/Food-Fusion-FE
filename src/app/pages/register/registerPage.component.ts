import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/registerModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasicErrorStateMatcher } from 'src/app/helpers/basicErrorStateMatcher';

@Component({
    templateUrl: './registerPage.component.html',
    styleUrls: ['../login/loginPage.component.scss']
})
export class RegisterPageComponent implements OnInit {
    hidePass = true;
    showSpinner = false;
    showError = false;

    matcher = new BasicErrorStateMatcher();

    form = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        fullName: new FormControl('', [
            Validators.required
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ])
    });

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void { }

    register(): void {
        this.showSpinner = true;
        const registerModel: RegisterModel = {
            email: this.form.value.email,
            fullName: this.form.value.fullName,
            password: this.form.value.password
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
