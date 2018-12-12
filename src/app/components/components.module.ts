import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { MaterialCustomModule } from '../maerial-custom.module';

@NgModule({
    declarations: [ EmployeesListComponent ],
    imports: [ CommonModule, MaterialCustomModule ],
    exports: [ EmployeesListComponent ],
    providers: [],
})
export class ComponentsModule { }
