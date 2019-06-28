import { NgModule } from '@angular/core';
import { BookRoomDialogComponent } from './book-room-dialog/book-room-dialog.component';
import { HotelBookingPageComponent } from './hotelBookingPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdvancedFiltersDialogComponent } from './advanced-filters-dialog/advanced-filters-dialog.component';

@NgModule({
    declarations: [
        HotelBookingPageComponent,
        BookRoomDialogComponent,
        AdvancedFiltersDialogComponent
    ],
    imports: [
        SharedModule,
        ComponentsModule
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
