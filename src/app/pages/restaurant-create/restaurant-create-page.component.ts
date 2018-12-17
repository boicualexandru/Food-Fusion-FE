import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { serverSideValidator } from 'src/app/helpers/serverSideValidator';
import { DirtyTouchedSubmittedErrorStateMatcher } from 'src/app/helpers/dirtyTouchedSubmittedErrorStateMatcher';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './restaurant-create-page.component.html',
    styleUrls: ['./restaurant-create-page.component.scss']
})
export class RestaurantCreatePageComponent implements OnInit {
    serverErrorMessage: BehaviorSubject<any> = new BehaviorSubject<any>({});

    form = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'name')
        ]),
        city: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'city')
        ]),
        contact: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'contact')
        ]),
        description: new FormControl('', [
            Validators.required,
            serverSideValidator(this.serverErrorMessage, 'description')
        ]),
    });

    matcher = new DirtyTouchedSubmittedErrorStateMatcher();

    constructor(private restaurantsService: RestaurantsService, private router: Router) { }

    ngOnInit(): void { }

    create(): void {
        this.restaurantsService.create(this.form.value)
            .subscribe(
                restaurant => this.router.navigate(['restaurant', restaurant.id]));
    }
}
