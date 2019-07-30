import { NgModule } from '@angular/core';
import { BookRoomDialogComponent } from './book-room-dialog/book-room-dialog.component';
import { HotelBookingPageComponent } from './hotelBookingPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';
import { Routes, RouterModule } from '@angular/router';

const lazyModuleRoutes: Routes = [
    { path: '', component: HotelBookingPageComponent }
];

@NgModule({
    declarations: [
        HotelBookingPageComponent,
        BookRoomDialogComponent,
        AdvancedFiltersDialogComponent
    ],
    imports: [
        SharedModule,
        ComponentsModule,
        RouterModule.forChild(lazyModuleRoutes)
    ],
    exports: [
        HotelBookingPageComponent
    ],
    entryComponents: [
        BookRoomDialogComponent,
        AdvancedFiltersDialogComponent
    ],
})
export class HotelBookingPageModule {}
