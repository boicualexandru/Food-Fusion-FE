import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login/loginPage.component';
import { HomePageComponent } from './home/homePage.component';
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
import { RestaurantsPageModule } from './restaurants/restaurantsPage.module';

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        HomePageComponent,
        RestaurantCreatePageComponent,
        UserReservationsPageComponent,
        HotelReservationsPageComponent,
        HotelUserReservationsPageComponent,
        HelpPageComponent],
    imports: [
        SharedModule,
        ComponentsModule,
        RestaurantPageModule,
        RestaurantsPageModule,
        HotelBookingPageModule],
    exports: [
        LoginPageComponent,
        RegisterPageComponent,
        HomePageComponent,
        RestaurantCreatePageComponent,
        RestaurantPageModule,
        RestaurantsPageModule,
        HotelBookingPageModule,
        UserReservationsPageComponent,
        HotelReservationsPageComponent,
        HotelUserReservationsPageComponent,
        HelpPageComponent]
})
export class PagesModule { }
