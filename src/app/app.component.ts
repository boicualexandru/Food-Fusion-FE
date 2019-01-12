import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserState } from './models/userState';
import { Router } from '@angular/router';
import { EditModeService } from './services/editMode.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: UserState;
    title = 'FoodFusion';
    isEditModeOn = false;

    constructor(private router: Router, private authService: AuthService,
        private editModeService: EditModeService) {
            this.currentUser = this.authService.currentUser;
            this.authService.currentUserObservable.subscribe(user => this.currentUser = user);
            this.editModeService.subscribe((isEditModeOn) => { this.isEditModeOn = isEditModeOn; });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    totggleEditMode() {
        this.editModeService.toggleEditMode();
    }
}
