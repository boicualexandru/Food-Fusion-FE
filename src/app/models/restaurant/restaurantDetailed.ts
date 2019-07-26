import { Menu } from '../menu/menu';
import { Cuisine } from '../cuisine/cuisine';
import { PriceRange } from './priceRange';

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
    priceRange: PriceRange;
    cuisines: Cuisine[];
}
