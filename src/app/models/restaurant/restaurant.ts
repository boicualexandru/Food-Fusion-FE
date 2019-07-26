import { Cuisine } from '../cuisine/cuisine';
import { PriceRange } from './priceRange';

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    contact: string;
    city: string;
    imageUrl: string;
    geoLatitude: number;
    geoLongitude: number;
    priceRange: PriceRange;
    cuisines: Cuisine[];
}
