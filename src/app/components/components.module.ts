import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AvailabilitySliderComponent } from './availability-slider/availability-slider.component';

@NgModule({
    declarations: [ ConfirmDialogComponent, AvailabilitySliderComponent ],
    imports: [ SharedModule ],
    exports: [ AvailabilitySliderComponent ],
    providers: [],
    entryComponents: [ ConfirmDialogComponent ]
})
export class ComponentsModule { }
