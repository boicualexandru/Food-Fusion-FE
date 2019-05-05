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
import { HotelBookingPageModule } from './hotel-booking/hotelBookingPage.module';
import { HelpPageComponent } from './help/helpPage.component';
import { HotelReservationsPageComponent } from './hotel-reservations/hotel-reservations.page.component';
import { HotelUserReservationsPageComponent } from './hotel-user-reservations/hotel-user-reservations.page.component';

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        HotelPageComponent,
        RestaurantsPageComponent,
        RestaurantCreatePageComponent,
        UserReservationsPageComponent,
        HotelReservationsPageComponent,
        HotelUserReservationsPageComponent,
        HelpPageComponent],
    imports: [
        SharedModule,
        ComponentsModule,
        RestaurantPageModule,
        HotelBookingPageModule],
    exports: [
        LoginPageComponent,
        RegisterPageComponent,
        HotelPageComponent,
        RestaurantsPageComponent,
        RestaurantCreatePageComponent,
        RestaurantPageModule,
        HotelBookingPageModule,
        UserReservationsPageComponent,
        HotelReservationsPageComponent,
        HotelUserReservationsPageComponent,
        HelpPageComponent]
})
export class PagesModule { }
