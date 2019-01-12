import { MenuItem } from './menuItem';

export interface MenuElement {
    name: string;
    isLeaf: boolean;

    add(menuComponent: MenuElement): void;
    remove(menuComponent: MenuElement): void;
    get(): MenuElement[];
}

export class MenuComposite implements MenuElement {
    public name: string;
    public isLeaf = false;

    private menuElements: MenuElement[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public add(menuComponent: MenuElement): void {
        this.menuElements.push(menuComponent);
    }

    public remove(menuComponent: MenuElement): void {
        const index = this.menuElements.indexOf(menuComponent);
        this.menuElements.splice(index, 1);
    }

    public get(): MenuElement[] {
        return this.menuElements;
    }
}

export class MenuItemLeaf implements MenuElement {
    public name: string;
    public isLeaf = true;

    constructor(name: string) {
        this.name = name;
    }

    public add(menuComponent: MenuElement): void {
        console.log('items cannot be added to item');
    }

    public remove(menuComponent: MenuElement): void {
        console.log('items cannot be removed from item');
    }

    public get(): MenuElement[] {
        return [];
    }
}

export interface Menu {
    id: number;
    items: MenuItem[];
}
