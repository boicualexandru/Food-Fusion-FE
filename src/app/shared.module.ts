import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialCustomModule } from './material-custom.module';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { FillPipe } from './pipes/fill.pipe';

@NgModule({
    declarations: [ FillPipe ],
    imports: [ CommonModule, HttpClientModule, FormsModule,
        ReactiveFormsModule, MaterialCustomModule, AgmCoreModule],
    exports: [ CommonModule, HttpClientModule, FormsModule,
        ReactiveFormsModule, MaterialCustomModule, AgmCoreModule, FillPipe],
    providers: [ DatePipe ],
})
export class SharedModule {}
