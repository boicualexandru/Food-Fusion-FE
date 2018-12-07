export interface UserState {
    token: string;
    expirationDate: Date;
    userId: string;
    fullName: string;
    email: string;
    managedRestaurants: number[];
    employeeOfRestaurants: number[];
}
