import { NgModule } from '@angular/core';
import { BookRoomDialogComponent } from './book-room-dialog/book-room-dialog.component';
import { HotelBookingPageComponent } from './hotelBookingPage.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
    declarations: [
        HotelBookingPageComponent,
        BookRoomDialogComponent
    ],
    imports: [
        SharedModule,
        ComponentsModule
    ],
    exports: [
        HotelBookingPageComponent
    ],
    entryComponents: [
        BookRoomDialogComponent
    ],
})
export class HotelBookingPageModule {}
