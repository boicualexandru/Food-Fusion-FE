import { DateRange } from '../boilerplate/dateRange';
import { RestaurantSimple } from '../restaurant/restaurantSimple';
import { UserSimple } from '../user/userSimple';
import { Table } from '../restaurant/table';

export interface ReservationDetailed {
    id: number;
    restaurant: RestaurantSimple;
    user: UserSimple;
    participantsCount: number;
    range: DateRange;
    tables: Table[];
}
