import { Menu } from '../menu/menu';

export interface RestaurantDetailed {
    id: number;
    name: string;
    description: string;
    contact: string;
    city: string;
    imageUrl: string;
    geoLatitude: number;
    geoLongitude: number;
    menu: Menu;
}
