import { NgModule } from '@angular/core';
import { RestaurantCreatePageComponent } from './restaurant-create-page.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: RestaurantCreatePageComponent }
];

@NgModule({
    declarations: [ RestaurantCreatePageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ RestaurantCreatePageComponent ],
    providers: [],
})
export class RestaurantCreatePageModule {}
