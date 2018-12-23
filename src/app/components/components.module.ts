import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [ ConfirmDialogComponent ],
    imports: [ SharedModule ],
    exports: [],
    providers: [],
    entryComponents: [ ConfirmDialogComponent ]
})
export class ComponentsModule { }
