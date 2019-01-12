import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AvailabilitySliderComponent } from './availability-slider/availability-slider.component';
import { MenuCompositeComponent } from './menu-composite/menu-composite.component';

@NgModule({
    declarations: [ ConfirmDialogComponent, AvailabilitySliderComponent, MenuCompositeComponent ],
    imports: [ SharedModule ],
    exports: [ AvailabilitySliderComponent, MenuCompositeComponent ],
    providers: [],
    entryComponents: [ ConfirmDialogComponent ]
})
export class ComponentsModule { }
