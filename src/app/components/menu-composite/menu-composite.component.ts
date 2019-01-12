import { Component, OnInit, Input } from '@angular/core';
import { MenuElement } from 'src/app/models/menu/menu';

@Component({
    selector: 'app-menu-composite',
    templateUrl: './menu-composite.component.html',
    styleUrls: ['./menu-composite.component.scss']
})
export class MenuCompositeComponent implements OnInit {
    @Input() menuElement: MenuElement;

    constructor() { }

    ngOnInit(): void { }
}
