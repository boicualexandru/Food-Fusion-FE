import { DateRange } from '../boilerplate/dateRange';

export interface ReservationRequest {
    restaurantId: number;
    userId: number;
    participantsCount: number;
    range: DateRange;
    tableIds: number[];
}
