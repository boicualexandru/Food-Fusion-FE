import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu/menuItem';

export interface IDecoratedItem {
    getPrice(): number;
}

export class DecoratedItem implements IDecoratedItem {
    private item: MenuItem;

    constructor(item: MenuItem) {
        this.item = item;
    }

    getPrice(): number {
        return this.item.price;
    }
}

export interface IDecorator extends IDecoratedItem {
    baseItem: IDecoratedItem;
}

export class TomatoSauceDecorator implements IDecorator {
    baseItem: IDecoratedItem;
    private price = 2;

    constructor(baseItem: IDecoratedItem) {
        this.baseItem = baseItem;
    }

    getPrice(): number {
        return this.baseItem.getPrice() + this.price;
    }
}

export class SpicySauceDecorator implements IDecorator {
    baseItem: IDecoratedItem;
    private price = 3;

    constructor(baseItem: IDecoratedItem) {
        this.baseItem = baseItem;
    }

    getPrice(): number {
        return this.baseItem.getPrice() + this.price;
    }
}

@Injectable()
export class DecoratorsService {

}
