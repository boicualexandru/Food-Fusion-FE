import { Injectable } from '@angular/core';
import { Menu, MenuElement, MenuComposite, MenuItemLeaf } from '../models/menu/menu';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu/menuItem';
import { environment } from 'src/environments/environment';

const TREE_DATA2 = JSON.stringify({
    name: 'Menu',
    items: ['burger1', 'burger2'],
    menus: [
        {
            name: 'Bauturi',
            items: [],
            menus: [
                {
                    name: 'Alcoolice',
                    items: ['Bere1', 'Bere2'],
                    menus: []
                },
                {
                    name: 'Non Alcoolice',
                    items: ['apa minerala', 'apa plata'],
                    menus: [
                        {
                            name: 'Shoturi',
                            items: ['absint', 'tequila'],
                            menus: []
                        }
                    ]
                }
            ]
        }
    ]
});

@Injectable()
export class MenuService {
    constructor(private http: HttpClient) { }

    getMenuByRestaurantId(restaurantId: number): MenuElement {
        const menudata = JSON.parse(TREE_DATA2);
        const menuComposite: MenuElement = this.getSubmenuComposite(menudata);

        return menuComposite;
        // return this.http.get<Menu>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Menu');
    }

    private getSubmenuComposite(submenu: any): MenuComposite {
        const result = new MenuComposite(submenu.name);

        submenu.items.forEach((item: string) => {
            const itemLeaf = new MenuItemLeaf(item);
            result.add(itemLeaf);
        });

        submenu.menus.forEach(menu => {
            const submenuComposite = this.getSubmenuComposite(menu);
            result.add(submenuComposite);
        });

        return result;
    }

    addMenuItem(menuId: number, menuItem: MenuItem) {
        return this.http.post<MenuItem>(environment.apiBaseUrl + '/Restaurants/Menu/' + menuId + '/Items', menuItem);
    }

    editMenuItem(menuItem: MenuItem) {
        return this.http.put<MenuItem>(environment.apiBaseUrl + '/Restaurants/Menu/Items/' + menuItem.id, menuItem);
    }

    removeMenuItem(menuItemId: number) {
        return this.http.delete<MenuItem>(environment.apiBaseUrl + '/Restaurants/Menu/Items/' + menuItemId);
    }
}
