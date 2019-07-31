export enum PriceRange {
    Low = 1,
    Medium = 2,
    High = 3
}
export interface PriceRangeValue {
    priceRange: PriceRange;
    name: string;
}

const availablePriceRanges: PriceRangeValue[] = [
    { priceRange: PriceRange.Low, name: '$' },
    { priceRange: PriceRange.Medium, name: '$$' },
    { priceRange: PriceRange.High, name: '$$$' }
];
export default availablePriceRanges;
