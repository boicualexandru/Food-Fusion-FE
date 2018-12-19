import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login/loginPage.component';
import { RestaurantsPageComponent } from './restaurants/restaurantsPage.component';
import { RestaurantPageComponent } from './restaurant/restaurantPage.component';
import { ComponentsModule } from '../components/components.module';
import { RegisterPageComponent } from './register/registerPage.component';
import { SharedModule } from '../shared.module';
import { RestaurantCreatePageComponent } from './restaurant-create/restaurant-create-page.component';
import { ItemEditDialogComponent } from './restaurant/menu/item-edit-dialog/item-edit-dialog.component';

@NgModule({
    declarations: [ LoginPageComponent, RegisterPageComponent, RestaurantsPageComponent, RestaurantPageComponent,
        RestaurantCreatePageComponent, ItemEditDialogComponent ],
    imports: [ SharedModule, ComponentsModule ],
    exports: [ LoginPageComponent, RegisterPageComponent, RestaurantsPageComponent, RestaurantPageComponent,
        RestaurantCreatePageComponent ],
    entryComponents: [ ItemEditDialogComponent ]
})
export class PagesModule {}
