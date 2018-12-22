import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmpoyeeEditDialogComponent } from './employees-list/employee-edit-dialog.component';
import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [ EmployeesListComponent, EmpoyeeEditDialogComponent, ConfirmDialogComponent ],
    imports: [ SharedModule ],
    exports: [ EmployeesListComponent],
    providers: [],
    entryComponents: [ EmpoyeeEditDialogComponent, ConfirmDialogComponent ]
})
export class ComponentsModule { }
