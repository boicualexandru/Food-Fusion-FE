import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', loadChildren: '../app/pages/login/loginPage.module#LoginPageModule' },
  { path: 'register', loadChildren: '../app/pages/register/registerPage.module#RegisterPageModule' },
  { path: 'home', loadChildren: '../app/pages/home/homePage.module#HomePageModule' },
  { path: 'rooms', loadChildren: '../app/pages/hotel-booking/hotelBookingPage.module#HotelBookingPageModule' },
  { path: 'restaurants', loadChildren: '../app/pages/restaurants/restaurantsPage.module#RestaurantsPageModule' },
  { path: 'restaurant/:id', loadChildren: '../app/pages/restaurant/restaurantPage.module#RestaurantPageModule' },
  { path: 'restaurant/:id/:tab', loadChildren: '../app/pages/restaurant/restaurantPage.module#RestaurantPageModule' },
  { path: 'restaurant-create', loadChildren: '../app/pages/restaurant-create/restaurant-create-page.module#RestaurantCreatePageModule' },
  { path: 'reservations', loadChildren: '../app/pages/user-reservations/user-reservations.page.module#UserReservationsPageModule' },
  { path: 'hotel-reservations', loadChildren: '../app/pages/hotel-reservations/hotel-reservations.page.module#HotelReservationsPageModule' },
  { path: 'hotel-user-reservations', loadChildren: '../app/pages/hotel-user-reservations/hotel-user-reservations.page.module#HotelUserReservationsPageModule' },
  { path: 'help', loadChildren: '../app/pages/help/helpPage.module#HelpPageModule' },
  { path: '**', redirectTo: 'restaurants' }
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
