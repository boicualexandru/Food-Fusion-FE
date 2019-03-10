import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationRequest } from 'src/app/models/reservation/reservationRequest';

@Component({
    selector: 'app-choose-table-dialog',
    templateUrl: './choose-table-dialog.component.html',
    styleUrls: ['./choose-table-dialog.component.scss']
})
export class ChoosetableDialogComponent implements OnInit {
    tables: any[] = [{
        name: 'Table 1',
        participantsCount: 4
    },
    {
        name: 'Table 2',
        participantsCount: 2
    },
    {
        name: 'Table 3',
        participantsCount: 5
    },
    {
        name: 'Table 4',
        participantsCount: 6
    }];

    constructor(public dialogRef: MatDialogRef<ChoosetableDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private reservationRequest: ReservationRequest) {
    }

    ngOnInit(): void { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
