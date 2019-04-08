import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login/loginPage.component';
import { RestaurantsPageComponent } from './restaurants/restaurantsPage.component';
import { HotelPageComponent } from './hotel/hotelPage.component';
import { ComponentsModule } from '../components/components.module';
import { RegisterPageComponent } from './register/registerPage.component';
import { SharedModule } from '../shared.module';
import { RestaurantCreatePageComponent } from './restaurant-create/restaurant-create-page.component';
import { RestaurantPageModule } from './restaurant/restaurantPage.module';
import { UserReservationsPageComponent } from './user-reservations/user-reservations.page.component';
import { HotelBookingPageComponent } from './hotel-booking/hotelBookingPage.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        HotelPageComponent,
        HotelBookingPageComponent,
        RestaurantsPageComponent,
        RestaurantCreatePageComponent,
        UserReservationsPageComponent],
    imports: [
        SharedModule,
        ComponentsModule,
        RestaurantPageModule],
    exports: [
        LoginPageComponent,
        RegisterPageComponent,
        HotelPageComponent,
        HotelBookingPageComponent,
        RestaurantsPageComponent,
        RestaurantCreatePageComponent,
        RestaurantPageModule,
        UserReservationsPageComponent]
})
export class PagesModule { }
