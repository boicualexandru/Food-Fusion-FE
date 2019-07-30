import { NgModule } from '@angular/core';
import { UserReservationsPageComponent } from './user-reservations.page.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: UserReservationsPageComponent }
];

@NgModule({
    declarations: [ UserReservationsPageComponent ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes) ],
    exports: [ UserReservationsPageComponent ],
    providers: [],
})
export class UserReservationsPageModule {}
