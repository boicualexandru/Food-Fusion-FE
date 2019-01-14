import { NgModule } from '@angular/core';
import { RestaurantPageComponent } from './restaurantPage.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmpoyeeEditDialogComponent } from './employees-list/employee-edit-dialog/employee-edit-dialog.component';
import { ItemEditDialogComponent } from './menu/item-edit-dialog/item-edit-dialog.component';
import { SharedModule } from 'src/app/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MenuComponent } from './menu/menu.component';
import { BookComponent } from './book/book.component';
import { RestaurantReservationsComponent } from './reservations/restaurant-reservations.component';

@NgModule({
    declarations: [
        RestaurantPageComponent,
        EmployeesListComponent,
        EmpoyeeEditDialogComponent,
        MenuComponent,
        RestaurantReservationsComponent,
        ItemEditDialogComponent,
        BookComponent ],
    imports: [
        SharedModule,
        ComponentsModule],
    exports: [
        RestaurantPageComponent,
        EmployeesListComponent,
        MenuComponent,
        RestaurantReservationsComponent],
    entryComponents: [
        EmpoyeeEditDialogComponent,
        ItemEditDialogComponent]
})
export class RestaurantPageModule { }
