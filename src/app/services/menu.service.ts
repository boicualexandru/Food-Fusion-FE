import { Injectable } from '@angular/core';
import { Menu } from '../models/menu/menu';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu/menuItem';
import { environment } from 'src/environments/environment';

@Injectable()
export class MenuService {
    constructor(private http: HttpClient) { }

    getMenuByRestaurantId(restaurantId: number) {
        return this.http.get<Menu>(environment.apiBaseUrl + '/Restaurants/' + restaurantId + '/Menu');
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
