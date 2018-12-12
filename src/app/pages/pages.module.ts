import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login/loginPage.component';
import { MaterialCustomModule } from '../maerial-custom.module';
import { RestaurantsPageComponent } from './restaurants/restaurantsPage.component';
import { RestaurantPageComponent } from './restaurant/restaurantPage.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [ LoginPageComponent, RestaurantsPageComponent, RestaurantPageComponent ],
    imports: [ CommonModule, MaterialCustomModule, FormsModule, ComponentsModule ],
    exports: [ LoginPageComponent, RestaurantsPageComponent, RestaurantPageComponent ],
})
export class PagesModule {}
