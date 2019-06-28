import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HotelService } from 'src/app/services/hotel.service';
import { HotelRoomBooking } from 'src/app/models/hotel/hotelRoomBooking';
import { HotelRoomsFilters } from 'src/app/models/hotel/hotelRoomsFilters';
import { HotelRoom } from 'src/app/models/hotel/hotelRoom';
import { async } from 'q';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


declare var StripeCheckout; // : StripeCheckoutStatic;

@Component({
    selector: 'app-book-room-dialog',
    templateUrl: './book-room-dialog.component.html',
    styleUrls: ['./book-room-dialog.component.scss']
})
export class BookRoomDialogComponent implements OnInit {
    bookingDetails: HotelRoomBooking;
    totalPayment = 0;

    handler; // : StripeCheckoutHandler;

    constructor(public dialogRef: MatDialogRef<BookRoomDialogComponent>,
        private authService: AuthService,
        private router: Router,
        private hotelService: HotelService,
        @Inject(MAT_DIALOG_DATA) public data: { filters: HotelRoomsFilters, room: HotelRoom }) {
            this.bookingDetails = {
                guests: data.filters.guests,
                range: data.filters.timeRange,
                roomId: data.room.id
            };

            const diffTime = Math.abs(data.filters.timeRange.start.getTime() - data.filters.timeRange.end.getTime());
            const daysCount = Math.ceil(diffTime / (1000 * 3600 * 24));

            this.totalPayment = data.room.price * daysCount;
    }

    ngOnInit(): void {
        // this.handler = StripeCheckout.configure({
        //     key: 'pk_test_7nqC7bY85h8f0bERWXbIC54Z00evalkYnc',
        //     locale: 'ro',
        //     currency: 'RON',
        //     email: this.authService.currentUser.email,
        //     source: async (source) => {
        //         this.hotelService.bookRoom(this.bookingDetails).subscribe(
        //             () => this.dialogRef.close(),
        //             err => console.error(err)
        //         );
        //     }
        // });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    book(): void {
        // this.handler.open({
        //     name: 'Hotel Reservation',
        //     image: 'data:image/png;base64,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',
        //     description: formatDate(this.data.filters.timeRange.start, 'd MMMM, y', 'en') + ' - ' +
        //         formatDate(this.data.filters.timeRange.end, 'd MMMM, y', 'en'),
        //     amount: this.totalPayment * 100
        // });

        this.hotelService.bookRoom(this.bookingDetails).subscribe(
            () => {
                this.dialogRef.close();
                this.router.navigateByUrl('hotel-user-reservations');
            },
            err => console.error(err)
        );
    }
}
