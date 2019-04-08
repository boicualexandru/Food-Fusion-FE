import { DateRange } from '../boilerplate/dateRange';

export interface HotelRoomsFilters {
    guests: number;
    featureIds: number[];
    timeRange: DateRange;
}
