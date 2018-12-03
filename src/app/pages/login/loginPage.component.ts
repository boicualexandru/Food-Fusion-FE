import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './loginPage.component.html',
    styleUrls: ['./loginPage.component.scss']
})
export class LoginPageComponent implements OnInit {
    hidePass = true;

    email: string;
    password: string;

    constructor() { }

    ngOnInit(): void { }

    login(): void {
        if (this.email === 'admin' && this.password === 'admin') {
            alert('Success');
        } else {
            alert('Invalid credentials');
        }
    }
}
