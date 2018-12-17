import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login/loginPage.component';
import { PagesModule } from './pages/pages.module';
import { AuthService } from './services/auth.service';
import { RestaurantsService } from './services/restaurants.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { RestaurantsPageComponent } from './pages/restaurants/restaurantsPage.component';
import { RestaurantPageComponent } from './pages/restaurant/restaurantPage.component';
import { EmployeesService } from './services/employees.service';
import { RegisterPageComponent } from './pages/register/registerPage.component';
import { SharedModule } from './shared.module';

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'restaurants', component: RestaurantsPageComponent },
  { path: 'restaurant/:id', component: RestaurantPageComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule,
    SharedModule,
    PagesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, RestaurantsService, EmployeesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
