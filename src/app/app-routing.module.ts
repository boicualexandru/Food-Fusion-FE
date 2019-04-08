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

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'hotel', component: HotelPageComponent },
  { path: 'hotel-booking', component: HotelBookingPageComponent },
  { path: 'restaurants', component: RestaurantsPageComponent },
  { path: 'restaurant/:id', component: RestaurantPageComponent },
  { path: 'restaurant/:id/:tab', component: RestaurantPageComponent },
  { path: 'restaurant-create', component: RestaurantCreatePageComponent },
  { path: 'reservations', component: UserReservationsPageComponent },
  { path: '**', redirectTo: 'hotel' }
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
