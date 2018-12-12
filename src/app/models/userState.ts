export interface UserState {
    token: string;
    expirationDate: Date;
    userId: string;
    fullName: string;
    email: string;
    role: string;
    managedRestaurants: number[];
    employeeOfRestaurants: number[];
}
