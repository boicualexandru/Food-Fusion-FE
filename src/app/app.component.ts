import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { UserState } from './models/userState';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: UserState;
    title = 'FoodFusion';

    constructor(private router: Router, private authService: AuthService) {
        this.currentUser = this.authService.currentUser;
        this.authService.currentUserObservable.subscribe(user => this.currentUser = user);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
