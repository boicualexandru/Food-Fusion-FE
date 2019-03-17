import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationRequest } from 'src/app/models/reservation/reservationRequest';
import { BookingService } from 'src/app/services/booking service';
import { Table } from 'src/app/models/restaurant/table';

@Component({
    selector: 'app-choose-table-dialog',
    templateUrl: './choose-table-dialog.component.html',
    styleUrls: ['./choose-table-dialog.component.scss']
})
export class ChoosetableDialogComponent implements OnInit {
    tables: Table[] = [];

    constructor(public dialogRef: MatDialogRef<ChoosetableDialogComponent>,
        private bookingService: BookingService,
        @Inject(MAT_DIALOG_DATA) public reservationRequest: ReservationRequest) {
            this.bookingService.getAvailableTables(this.reservationRequest)
                .subscribe(tables => this.tables = tables);
    }

    ngOnInit(): void {}

    selectTable(table: Table) {
        this.dialogRef.close(table);
    }

    selectAuto(table: Table) {
        this.dialogRef.close(null);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
