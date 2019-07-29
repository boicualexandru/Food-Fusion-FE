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
    { priceRange: PriceRange.Low, name: 'Low' },
    { priceRange: PriceRange.Medium, name: 'Medium' },
    { priceRange: PriceRange.High, name: 'High' }
];
export default availablePriceRanges;
