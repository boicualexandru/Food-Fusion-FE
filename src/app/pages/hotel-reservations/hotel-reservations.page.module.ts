import { NgModule } from '@angular/core';
import { HotelReservationsPageComponent } from './hotel-reservations.page.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: HotelReservationsPageComponent }
];

@NgModule({
    declarations: [ HotelReservationsPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ HotelReservationsPageComponent ],
    providers: [],
})
export class HotelReservationsPageModule {}
