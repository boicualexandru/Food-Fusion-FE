import { NgModule } from '@angular/core';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmpoyeeEditDialogComponent } from './employees-list/employee-edit-dialog.component';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [ EmployeesListComponent, EmpoyeeEditDialogComponent ],
    imports: [ SharedModule ],
    exports: [ EmployeesListComponent],
    providers: [],
    entryComponents: [ EmpoyeeEditDialogComponent ]
})
export class ComponentsModule { }
