import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/loginPage.component';
import { RegisterPageComponent } from './pages/register/registerPage.component';
import { HotelPageComponent } from './pages/hotel/hotelPage.component';
import { RestaurantsPageComponent } from './pages/restaurants/restaurantsPage.component';
import { RestaurantPageComponent } from './pages/restaurant/restaurantPage.component';
import { RestaurantCreatePageComponent } from './pages/restaurant-create/restaurant-create-page.component';
import { UserReservationsPageComponent } from './pages/user-reservations/user-reservations.page.component';
import { HotelBookingPageComponent } from './pages/hotel-booking/hotelBookingPage.component';
import { HelpPageComponent } from './pages/help/helpPage.component';
import { HotelReservationsPageComponent } from './pages/hotel-reservations/hotel-reservations.page.component';
import { HotelUserReservationsPageComponent } from './pages/hotel-user-reservations/hotel-user-reservations.page.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HotelPageComponent },
  { path: 'rooms', component: HotelBookingPageComponent },
  { path: 'restaurants', component: RestaurantsPageComponent },
  { path: 'restaurant/:id', component: RestaurantPageComponent },
  { path: 'restaurant/:id/:tab', component: RestaurantPageComponent },
  { path: 'restaurant-create', component: RestaurantCreatePageComponent },
  { path: 'reservations', component: UserReservationsPageComponent },
  { path: 'hotel-reservations', component: HotelReservationsPageComponent },
  { path: 'hotel-user-reservations', component: HotelUserReservationsPageComponent },
  { path: 'help', component: HelpPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
