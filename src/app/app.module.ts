import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthService } from './services/auth.service';
import { RestaurantsService } from './services/restaurants.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { EmployeesService } from './services/employees.service';
import { SharedModule } from './shared.module';
import { MenuService } from './services/menu.service';
import { BookingService } from './services/booking service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    PagesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, RestaurantsService, EmployeesService, MenuService, BookingService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
