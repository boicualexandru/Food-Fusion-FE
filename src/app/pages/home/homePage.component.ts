import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './homePage.component.html',
    styleUrls: ['./homePage.component.scss']
})
export class HomePageComponent implements OnInit {

    dateFrom: Date = new Date();
    dateTo: Date = new Date();

    ngOnInit(): void { }

    dateFilter(date: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) { return false; }
        return true;
    }
}
