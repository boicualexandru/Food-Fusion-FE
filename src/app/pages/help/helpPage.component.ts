import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    templateUrl: './helpPage.component.html',
    styleUrls: ['./helpPage.component.scss']
})
export class HelpPageComponent implements OnInit {
    createAccount;
    bookTable;

    constructor(private sanitizer: DomSanitizer) {
        this.createAccount = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dCAwpSU5RpM');
        this.bookTable = sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mpUcBIPBAWA');
    }

    ngOnInit(): void { }
}
