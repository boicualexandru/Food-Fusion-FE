import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login/loginPage.component';
import { RestaurantsPageComponent } from './restaurants/restaurantsPage.component';
import { RestaurantPageComponent } from './restaurant/restaurantPage.component';
import { ComponentsModule } from '../components/components.module';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterPageComponent } from './register/registerPage.component';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [ LoginPageComponent, RegisterPageComponent, RestaurantsPageComponent, RestaurantPageComponent ],
    imports: [ SharedModule, ComponentsModule, AppRoutingModule ],
    exports: [ LoginPageComponent, RegisterPageComponent, RestaurantsPageComponent, RestaurantPageComponent ],
})
export class PagesModule {}
