import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmpoyeeEditDialogComponent } from './employees-list/employee-edit-dialog.component';
import { SharedModule } from '../shared.module';
import { EmployeeRemoveDialogComponent } from './employees-list/employee-remove-dialog.component';

@NgModule({
    declarations: [ EmployeesListComponent, EmpoyeeEditDialogComponent, EmployeeRemoveDialogComponent ],
    imports: [ SharedModule ],
    exports: [ EmployeesListComponent],
    providers: [],
    entryComponents: [ EmpoyeeEditDialogComponent, EmployeeRemoveDialogComponent ]
})
export class ComponentsModule { }
