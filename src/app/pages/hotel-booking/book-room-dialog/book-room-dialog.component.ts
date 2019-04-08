import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelRoomBooking } from 'src/app/models/hotel/hotelRoomBooking';
import { HotelRoomsFilters } from 'src/app/models/hotel/hotelRoomsFilters';
import { HotelRoom } from 'src/app/models/hotel/hotelRoom';

@Component({
    selector: 'app-book-room-dialog',
    templateUrl: './book-room-dialog.component.html',
    styleUrls: ['./book-room-dialog.component.scss']
})
export class BookRoomDialogComponent implements OnInit {
    bookingDetails: HotelRoomBooking;

    constructor(public dialogRef: MatDialogRef<BookRoomDialogComponent>,
        private hotelService: HotelService,
        @Inject(MAT_DIALOG_DATA) public data: { filters: HotelRoomsFilters, room: HotelRoom }) {
            this.bookingDetails = {
                guests: data.filters.guests,
                range: data.filters.timeRange,
                roomId: data.room.id
            };
    }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    book(): void {
        this.hotelService.bookRoom(this.bookingDetails).subscribe(
            () => this.dialogRef.close(),
            err => console.error(err)
        );
    }
}
