import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule} from '@angular/material';
import 'hammerjs';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule, MatDialogModule, MatDatepickerModule,
        MatNativeDateModule, MatSliderModule ],
    exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule, MatDialogModule, MatDatepickerModule,
        MatNativeDateModule, MatSliderModule ],
})
export class MaterialCustomModule { }
