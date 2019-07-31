import { PriceRange } from './priceRange';

export interface RestaurantsFilters {
    searchText: string;
    cuisineIds: number[];
    priceRanges: PriceRange[];
}

export function restaurantsFiltersToHttpParams(filters: RestaurantsFilters): {
        [param: string]: string | string[];
    } {
        const result: {
                [param: string]: string | string[];
            } = {};

        if (filters.searchText != null && filters.searchText.match(/^ *$/) === null) {
            result.searchText = filters.searchText;
        }

        if (filters.cuisineIds != null && filters.cuisineIds.length > 0) {
            result.cuisineIds = filters.cuisineIds.map(cId => cId.toString());
        }

        if (filters.priceRanges != null && filters.priceRanges.length > 0) {
            result.priceRanges = filters.priceRanges.map(cId => cId.toString());
        }

        return result;
    }
