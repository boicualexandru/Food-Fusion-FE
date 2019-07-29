export enum PriceRange {
    Low = 1,
    Medium = 2,
    High = 3
}
export interface PriceRangeValue {
    priceRange: PriceRange;
    value: string;
}

const availablePriceRanges: PriceRangeValue[] = [
    { priceRange: PriceRange.Low, value: 'Low' },
    { priceRange: PriceRange.Medium, value: 'Medium' },
    { priceRange: PriceRange.High, value: 'High' }
];
export default availablePriceRanges;
