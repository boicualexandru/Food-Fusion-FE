import { RestaurantSimple } from '../restaurant/restaurantSimple';
import { UserSimple } from '../user/userSimple';
import { DateRange } from '../boilerplate/dateRange';

export interface Reservation {
    id: number;
    restaurant: RestaurantSimple;
    user: UserSimple;
    participantsCount: number;
    range: DateRange;
}
