import { DateRange } from '../boilerplate/dateRange';
import { HotelRoom } from './hotelRoom';
import { UserSimple } from '../user/userSimple';

export interface HotelReservationDetailed {
    id: number;
    room: HotelRoom;
    user: UserSimple;
    guestsCount: number;
    range: DateRange;
}
