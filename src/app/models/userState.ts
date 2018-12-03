export interface UserState {
    token: string;
    ExpirationDate: Date;
    userId: string;
    fullName: string;
    email: string;
    managedRestaurants: number[];
    employeeOfRestaurants: number[];
}
