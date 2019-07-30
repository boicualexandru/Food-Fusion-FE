import { NgModule } from '@angular/core';
import { HotelUserReservationsPageComponent } from './hotel-user-reservations.page.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: HotelUserReservationsPageComponent }
];

@NgModule({
    declarations: [ HotelUserReservationsPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ HotelUserReservationsPageComponent ],
    providers: [],
})
export class HotelUserReservationsPageModule {}
