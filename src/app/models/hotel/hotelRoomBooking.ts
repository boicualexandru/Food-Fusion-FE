import { DateRange } from '../boilerplate/dateRange';

export interface HotelRoomBooking {
    roomId: number;
    range: DateRange;
    guests: number;
}
