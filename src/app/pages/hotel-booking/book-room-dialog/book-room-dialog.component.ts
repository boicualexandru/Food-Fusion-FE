import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelRoomBooking } from 'src/app/models/hotel/hotelRoomBooking';

@Component({
    selector: 'app-book-room-dialog',
    templateUrl: './book-room-dialog.component.html',
    styleUrls: ['./book-room-dialog.component.scss']
})
export class BookRoomDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<BookRoomDialogComponent>,
        private hotelService: HotelService,
        @Inject(MAT_DIALOG_DATA) public hotelRoomBookingDetails: HotelRoomBooking) {
    }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    book(): void {
        this.hotelService.bookRoom(this.hotelRoomBookingDetails).subscribe(
            () => this.dialogRef.close(),
            err => console.error(err)
        );
    }
}
