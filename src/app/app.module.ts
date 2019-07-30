import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RestaurantsService } from './services/restaurants.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { EmployeesService } from './services/employees.service';
import { SharedModule } from './shared.module';
import { MenuService } from './services/menu.service';
import { BookingService } from './services/booking service';
import { ReservationsService } from './services/reservations.service';
import { HotelService } from './services/hotel.service';
import { CuisinesService } from './services/cuisines.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyACJzuFEFKJxVATZGSYpxRoNH0tfCB1cqk'
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, RestaurantsService, EmployeesService, MenuService, BookingService, ReservationsService, HotelService, CuisinesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
