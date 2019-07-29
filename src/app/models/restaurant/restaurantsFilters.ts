import { PriceRange } from './priceRange';

export interface RestaurantsFilters {
    cuisineIds: number[];
    priceRanges: PriceRange[];
}
