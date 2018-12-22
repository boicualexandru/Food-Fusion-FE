import { Injectable } from '@angular/core';
import { Menu } from '../models/menu/menu';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu/menuItem';

@Injectable()
export class MenuService {
    private apiPath = 'http://localhost:56416/api';

    constructor(private http: HttpClient) { }

    getMenuByRestaurantId(restaurantId: number) {
        return this.http.get<Menu>(this.apiPath + '/Restaurants/' + restaurantId + '/Menu');
    }

    addMenuItem(menuId: number, menuItem: MenuItem) {
        return this.http.post<MenuItem>(this.apiPath + '/Restaurants/Menu/' + menuId + '/Items', menuItem);
    }

    editMenuItem(menuItem: MenuItem) {
        return this.http.put<MenuItem>(this.apiPath + '/Restaurants/Menu/Items/' + menuItem.id, menuItem);
    }

    removeMenuItem(menuItemId: MenuItem) {
        return this.http.delete<MenuItem>(this.apiPath + '/Restaurants/Menu/Items/' + menuItemId);
    }
}
