import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule,
    MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule, MatDialogModule, MatDatepickerModule,
        MatNativeDateModule ],
    exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule, MatCardModule,
        MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatTabsModule, MatListModule, MatDialogModule, MatDatepickerModule,
        MatNativeDateModule ],
})
export class MaterialCustomModule { }
