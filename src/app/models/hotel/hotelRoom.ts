import { HotelFeature } from './hotelFeature';

export interface HotelRoom {
    id: number;
    name: string;
    floor: number;
    beds: number;
    maxGuests: number;
    imageUrl: string;
    features: HotelFeature[];
}
