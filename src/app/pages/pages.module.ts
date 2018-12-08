import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login/loginPage.component';
import { MaterialCustomModule } from '../maerial-custom.module';
import { RestaurantsPageComponent } from './restaurants/restaurantsPage.component';

@NgModule({
    declarations: [ LoginPageComponent, RestaurantsPageComponent ],
    imports: [ CommonModule, MaterialCustomModule, FormsModule ],
    exports: [ LoginPageComponent, RestaurantsPageComponent ],
})
export class PagesModule {}
